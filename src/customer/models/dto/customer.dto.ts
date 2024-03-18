import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../../../user/models/entities/user.entity';
import { BaseDTO } from '../../../config/base.dto';

export class CustomerDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @IsNotEmpty()
  user: UserEntity;
}
