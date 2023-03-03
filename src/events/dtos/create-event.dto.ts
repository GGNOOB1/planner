import {
  IsString,
  IsISO8601,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsNumber,
  IsLatitude,
  IsLongitude,
  IsPositive,
} from 'class-validator';

export class CreateEventDto {
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

  @IsNotEmpty()
  @IsString()
  locationName: string;

  @IsLatitude({ message: 'latitude value is invalid' })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsLongitude({ message: 'longitude value is invalid' })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
