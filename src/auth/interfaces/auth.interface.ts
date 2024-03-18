import { RoleType } from '../../user/models/dto/user.dto';

export interface PayloadToken {
  role: RoleType;
  sub: string;
}

export interface SecretJWT {
  secret: string | undefined;
}
