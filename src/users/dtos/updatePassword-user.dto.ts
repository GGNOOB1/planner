import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  password: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  passwordConfirm: string;
}
