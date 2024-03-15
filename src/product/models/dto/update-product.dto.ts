import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
