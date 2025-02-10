import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class ReturnInvoiceItemDto {
  @IsUUID()
  productId!: string;

  @IsNumber()
  @IsPositive()
  quantity!: number;
}
