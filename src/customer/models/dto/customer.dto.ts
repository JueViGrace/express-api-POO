import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../../../user/models/entities/user.entity';

export class CustomerDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  dni: number;
}
