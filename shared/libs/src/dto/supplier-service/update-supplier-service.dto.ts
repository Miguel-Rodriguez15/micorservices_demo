import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier-service.dto';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsPhoneNumber('CO')
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(5, 255)
  address?: string;
}
