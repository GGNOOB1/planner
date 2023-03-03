import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  country: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  confirmPassword: string;
}
