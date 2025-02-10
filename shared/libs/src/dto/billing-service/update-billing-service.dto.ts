import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-billing-service.dto';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @IsUUID()
  @IsOptional()
  customerId!: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  total!: number;

  @IsIn(['PENDING', 'COMPLETED', 'CANCELLED', 'RETURNED'])
  @IsOptional()
  status!: string;
}
