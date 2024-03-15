import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../../../user/models/entities/user.entity';

export class UpdateCustomerDTO {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsNumber()
  dni?: number;

  @IsOptional()
  user?: UserEntity;
}
