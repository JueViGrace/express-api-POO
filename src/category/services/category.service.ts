import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CategoryDTO } from '../models/dto/category.dto';
import { UpdateCategoryDTO } from '../models/dto/update-category.dto';
import { CategoryEntity } from '../models/entities/category.entity';

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAllCategory(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }

  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOne({ where: [{ id }] });
  }

  async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
    return (await this.execRepository).save(body);
  }

  async updateCategory(
    id: string,
    updateDto: UpdateCategoryDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updateDto);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).softDelete(id);
  }
}