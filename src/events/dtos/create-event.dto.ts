import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  locationName: string;

  @ApiProperty()
  @IsLatitude({ message: 'latitude value is invalid' })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsLongitude({ message: 'longitude value is invalid' })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
