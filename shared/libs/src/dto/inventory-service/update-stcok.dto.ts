import { IsNumber, IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class UpdateStockDto {
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity!: number;
}
