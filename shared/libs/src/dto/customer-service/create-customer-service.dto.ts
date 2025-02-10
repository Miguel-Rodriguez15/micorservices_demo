import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsPhoneNumber('CO')
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  address!: string;
}
