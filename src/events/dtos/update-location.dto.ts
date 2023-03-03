import {
  IsNotEmpty,
  IsString,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from 'class-validator';

export class UpdateLocationDto {
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
