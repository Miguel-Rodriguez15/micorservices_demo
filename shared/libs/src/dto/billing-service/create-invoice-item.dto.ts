import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsUUID()
  productId!: string;

  @IsNumber()
  @IsPositive()
  quantity!: number;

  @IsNumber()
  @IsPositive()
  price!: number;
}
