import {
  IsString,
  IsISO8601,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateEventDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsISO8601()
  dateTime: Date;

  weekDay: string;
}
