import { Controller, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { Post, Put, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signUp')
  signUp(@Body() createdUserDto: CreateUserDto) {
    return this.usersService.create(createdUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() updatedUser: UpdateUserDto) {
    return this.usersService.update(id, updatedUser);
  }
}
