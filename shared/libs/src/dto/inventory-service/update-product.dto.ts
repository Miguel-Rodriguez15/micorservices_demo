import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { Type } from 'class-transformer';

export class UpdateProductDto extends CreateProductDto {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  name!: string;

  @IsString()
  @IsOptional()
  @Length(3, 255)
  description!: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  price!: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  stock!: number;

  @IsString()
  @IsOptional()
  sku!: string;
}
