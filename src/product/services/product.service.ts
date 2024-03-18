import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductEntity } from '../models/entities/product.entity';
import { ProductDTO } from '../models/dto/product.dto';
import { UpdateProductDTO } from '../models/dto/update-product.dto';

export class ProductService extends BaseService<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  async findAllProduct(): Promise<ProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findProductById(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).findOne({ where: [{ id }] });
  }

  async findProductWithRelation(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .getOne();
  }

  async createProduct(body: ProductDTO): Promise<ProductEntity> {
    return (await this.execRepository).save(body);
  }

  async updateProduct(
    id: string,
    body: UpdateProductDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).softDelete(id);
  }
}
