import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';
import { ProductEntity } from '../../../product/models/entities/product.entity';
import { PurchaseEntity } from '../entities/purchase.entity';

export class PurchaseProductDTO extends BaseDTO {
  @IsNotEmpty()
  @IsNumber()
  quantityProduct: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductEntity;
}
