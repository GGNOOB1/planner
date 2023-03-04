import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  confirmPassword: string;
}
