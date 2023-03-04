import { ApiProperty } from '@nestjs/swagger';

export class getOnlyEventSwagger {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  dateTime: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  weekDay: string;
}
