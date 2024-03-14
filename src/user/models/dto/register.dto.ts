import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsString()
  codigo: string;

  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(10)
  telefono: string;
}
