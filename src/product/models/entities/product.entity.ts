import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { CategoryEntity } from '../../../category/models/entities/category.entity';
import { PurchaseProductEntity } from '../../../purchase/models/entities/purchases-products.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @Column()
  productName: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 24, scale: 4 })
  price: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct) => purchaseProduct.product,
  )
  purchaseProduct: PurchaseProductEntity[];
}
