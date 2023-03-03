import {
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

import { UpdatePasswordDto } from './dtos/updatePassword-user.dto';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signUp')
  signUp(@Body() createdUserDto: CreateUserDto) {
    return this.usersService.create(createdUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/updatePassword')
  updatePassword(@Req() req, @Body() body: UpdatePasswordDto) {
    return this.usersService.updatePassword(req.user, body);
  }
}
