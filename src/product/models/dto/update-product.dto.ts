import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from '../../../category/models/entities/category.entity';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  category?: CategoryEntity;
}
