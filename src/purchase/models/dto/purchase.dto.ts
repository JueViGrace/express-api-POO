import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
