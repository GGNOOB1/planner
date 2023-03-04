import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsISO8601,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  dateTime: Date;

  weekDay: string;
}
