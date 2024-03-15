import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';
import { CategoryEntity } from '../../../category/models/entities/category.entity';

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

  @IsNotEmpty()
  category: CategoryEntity;
}
