import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { ReturnInvoiceItemDto } from './return-invoice-item.dto';

export class CreateInvoiceItemReturnDto {
  @IsUUID()
  invoiceId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReturnInvoiceItemDto)
  items!: ReturnInvoiceItemDto[];
}

export enum InvoiceStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}
