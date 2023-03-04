import {
  Controller,
  Post,
  Req,
  Put,
  Param,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Delete, HttpCode } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/auth/dtos/update-user.dto';
import { status204, status401, status403 } from 'src/swagger/api-responses';
import { tokenSwagger } from 'src/swagger/token-swagger';
import { UpdateUserSwagger } from 'src/swagger/update-user-swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('/api/v1/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/signIn')
  @ApiOperation({
    summary:
      'The login route is used to login to the api as a user through your email and password',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: tokenSwagger,
  })
  @ApiResponse(status401)
  @ApiResponse(status403)
  signIn(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/refreshToken')
  @ApiOperation({
    summary: 'Route to refresh current token',
  })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: tokenSwagger,
  })
  @ApiResponse(status401)
  refreshToken(@Req() req) {
    return this.authService.generateNewToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('/:id')
  @ApiOperation({
    summary: 'This route is for updating users based on id.',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: UpdateUserSwagger,
  })
  @ApiResponse(status401)
  @ApiResponse(status403)
  updateUser(
    @Req() req,
    @Param('id') id: number,
    @Body() updatedUser: UpdateUserDto,
  ) {
    const token = req.rawHeaders[1];

    return this.authService.update(token, id, updatedUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({
    summary: 'This route is for deleting users from their id',
  })
  @ApiResponse(status204)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Req() req, @Param('id') id: number) {
    const token = req.rawHeaders[1];

    return this.authService.delete(token, id);
  }
}
