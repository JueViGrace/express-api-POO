import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseProductDTO } from '../models/dto/purchase-product.dto';
import { PurchaseProductEntity } from '../models/entities/purchases-products.entity';
import { UpdatePurchaseProductDTO } from '../models/dto/update-purchase-product.dto';
import { ProductService } from '../../product/services/product.service';

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService(),
  ) {
    super(PurchaseProductEntity);
  }

  async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(
    id: string,
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOne({ where: [{ id }] });
  }

  async findPurchaseProductWithRelation(
    id: string,
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('purchases_products')
      .leftJoinAndSelect('purchases_products.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('purchases_products.purchase', 'purchase')
      .leftJoinAndSelect('purchase.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where({ id })
      .getOne();
  }

  async createPurchaseProduct(
    body: PurchaseProductDTO,
  ): Promise<PurchaseProductEntity> {
    const newPP = (await this.execRepository).create(body);

    const prod = await this.productService.findProductById(newPP.product.id);

    newPP.totalPrice = prod!.price * newPP.quantityProduct;

    return (await this.execRepository).save(newPP);
  }

  async updatePurchaseProduct(
    id: string,
    body: UpdatePurchaseProductDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
