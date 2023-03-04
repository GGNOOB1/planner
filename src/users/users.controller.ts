import { Controller, Req, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

import { UpdatePasswordDto } from './dtos/updatePassword-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserSwagger } from 'src/swagger/create-user-swagger';
import { status401, status403 } from 'src/swagger/api-responses';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signUp')
  @ApiOperation({
    summary:
      'The registration route is used to create a user through the mandatory fields',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateUserSwagger,
    isArray: true,
  })
  @ApiResponse(status403)
  signUp(@Body() createdUserDto: CreateUserDto) {
    return this.usersService.create(createdUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/updatePassword')
  @ApiOperation({
    summary: 'Route to update authenticated user password',
  })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 201,
    description: 'created',
  })
  @ApiResponse(status401)
  @ApiResponse(status403)
  updatePassword(@Req() req, @Body() body: UpdatePasswordDto) {
    const user = req.user;
    return this.usersService.updatePassword(user, body);
  }
}
