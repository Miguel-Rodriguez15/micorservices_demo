import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  stock!: number;

  @IsString()
  @IsNotEmpty()
  sku!: string;
}
