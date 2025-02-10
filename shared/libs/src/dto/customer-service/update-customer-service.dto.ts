import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer-service.dto';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  name!: string;

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
