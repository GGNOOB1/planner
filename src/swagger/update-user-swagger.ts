import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

export class UpdateUserSwagger extends OmitType(CreateUserDto, [
  'confirmPassword',
]) {}
