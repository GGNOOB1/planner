import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

export class CreateUserSwagger extends OmitType(CreateUserDto, [
  'password',
  'confirmPassword',
]) {}
