import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseProductDTO } from '../models/dto/purchase-product.dto';
import { PurchaseProductEntity } from '../models/entities/purchases-products.entity';
import { UpdatePurchaseProductDTO } from '../models/dto/update-purchase-product.dto';

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor() {
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

  async createPurchaseProduct(
    body: PurchaseProductDTO,
  ): Promise<PurchaseProductEntity> {
    return (await this.execRepository).save(body);
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
