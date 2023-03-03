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
import { UpdateUserDto } from 'src/auth/dtos/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('/api/v1/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/signIn')
  signIn(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/refreshToken')
  refreshToken(@Req() req) {
    return this.authService.generateNewToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateUser(
    @Req() req,
    @Param('id') id: number,
    @Body() updatedUser: UpdateUserDto,
  ) {
    const token = req.rawHeaders[1];

    return this.authService.update(token, id, updatedUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Req() req, @Param('id') id: number) {
    const token = req.rawHeaders[1];

    return this.authService.delete(token, id);
  }
}
