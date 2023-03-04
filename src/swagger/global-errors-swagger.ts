import { ApiProperty } from '@nestjs/swagger';
import { Errors } from './errors-swagger';

export class GlobalErrorSwagger {
  @ApiProperty()
  type: string;
  @ApiProperty()
  errors: Errors;
}
