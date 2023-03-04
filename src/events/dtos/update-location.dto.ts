import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from 'class-validator';

export class UpdateLocationDto {
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
