import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty()
  id: number;
  @ApiProperty()
  locationName: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
