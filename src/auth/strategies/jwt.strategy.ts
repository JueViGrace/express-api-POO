import {
  Strategy as JwtStr,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { PayloadToken } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<
      JwtStr,
      StrategyOptionsWithoutRequest,
      (payload: PayloadToken, done: any) => Promise<PayloadToken>
    >(
      'jwt',
      JwtStr,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnviroment('JWT_SECRET') ?? '',
        ignoreExpiration: false,
      },
      this.validate,
    );
  }
}
