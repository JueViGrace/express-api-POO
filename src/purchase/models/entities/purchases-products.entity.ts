import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PurchaseEntity } from './purchase.entity';
import { ProductEntity } from '../../../product/models/entities/product.entity';
import { BaseEntity } from '../../../config/base.entity';

@Entity({ name: 'purchases_products' })
export class PurchaseProductEntity extends BaseEntity {
  @Column()
  quantityProduct: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
