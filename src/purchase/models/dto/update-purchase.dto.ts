import { IsOptional, IsString } from 'class-validator';

export class UpdatePurchaseDTO {
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  paymentMethod: string;
}
