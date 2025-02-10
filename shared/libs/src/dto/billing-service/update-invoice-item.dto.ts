import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class UpdateInvoiceItemDto {
  @IsUUID()
  @IsOptional()
  invoiceId!: string;

  @IsUUID()
  @IsOptional()
  productId?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  quantity?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  subtotal?: number;
}
