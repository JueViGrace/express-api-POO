import { ConfigServer } from '../../config/config';
import { UserService } from '../../user/services/user.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../user/models/entities/user.entity';
import { PayloadToken, SecretJWT } from '../interfaces/auth.interface';

export class AuthService extends ConfigServer {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt,
  ) {
    super();
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const userByEmail = await this.userService.findUserByEmail(username);
    const userByUsername = await this.userService.findUserByUsername(username);

    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password);
      if (isMatch) {
        return userByUsername;
      }
    }

    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
      }
    }

    return null;
  }

  sign(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' });
  }

  public async generateJWT(
    user: UserEntity,
  ): Promise<{ accessToken: string; user: UserEntity }> {
    const userConsult = await this.userService.findUserWithRole(
      user.id,
      user.role,
    );

    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id,
    };

    if (userConsult) {
      user.password = 'Not permission';
    }

    return {
      accessToken: this.sign(payload, this.getEnviroment('JWT_SECRET')),
      user,
    };
  }
}
