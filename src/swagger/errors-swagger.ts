import { ApiProperty } from '@nestjs/swagger';

export class Errors {
  @ApiProperty()
  message: string;
}
