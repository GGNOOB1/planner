import { ApiProperty } from '@nestjs/swagger';
import { Location } from './location-swagger';

export class ResponsePostEventSwagger {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  dateTime: Date;
  @ApiProperty({ type: () => Location })
  location: Location;
  @ApiProperty()
  createdAt: Date;
}
