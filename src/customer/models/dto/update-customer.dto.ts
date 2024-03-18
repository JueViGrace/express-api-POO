import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../../../user/models/entities/user.entity';

export class UpdateCustomerDTO {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  dni?: number;

  @IsOptional()
  user?: UserEntity;
}
