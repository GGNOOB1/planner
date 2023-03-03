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
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsISO8601()
  dateTime: Date;

  weekDay: string;
}
