import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CustomerEntity } from '../../../customer/models/entities/customer.entity';

export class UpdatePurchaseDTO {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  customer?: CustomerEntity;
}
