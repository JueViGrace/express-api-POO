import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';

export class ProductDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
