import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  province: string;
}

export enum RoleType {
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}
