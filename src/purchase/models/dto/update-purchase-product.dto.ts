import { IsOptional } from 'class-validator';
import { ProductEntity } from '../../../product/models/entities/product.entity';
import { PurchaseEntity } from '../entities/purchase.entity';

export class UpdatePurchaseProductDTO {
  @IsOptional()
  quantityProduct?: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductEntity;
}
