import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';
import { CustomerEntity } from '../../../customer/models/entities/customer.entity';

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  customer: CustomerEntity;
}
