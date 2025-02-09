import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have an uppercase letter, a lowercase letter, and a number',
  })
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  document!: string;

  @IsOptional()
  @IsArray()
  roles?: string[];
}
