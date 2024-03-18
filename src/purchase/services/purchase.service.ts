import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseEntity } from '../models/entities/purchase.entity';
import { PurchaseDTO } from '../models/dto/purchase.dto';
import { UpdatePurchaseDTO } from '../models/dto/update-purchase.dto';

export class PurchaseService extends BaseService<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity);
  }

  async findAllPurchase(): Promise<PurchaseEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOne({ where: [{ id }] });
  }

  async findPurchaseWithRelation(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'user')
      .leftJoinAndSelect('purchase.purchaseProduct', 'purchaseProduct')
      .where({ id })
      .getOne();
  }

  async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
    return (await this.execRepository).save(body);
  }

  async updatePurchase(
    id: string,
    updateDto: UpdatePurchaseDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updateDto);
  }

  async deletePurchase(id: string): Promise<DeleteResult> {
    return (await this.execRepository).softDelete(id);
  }
}
