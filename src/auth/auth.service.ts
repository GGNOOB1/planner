import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/auth/dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { formatError } from 'src/helpers/formatErrors';
import { getPayLoad } from './helpers/getPayload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      const validPassword = compareSync(password, user.password);

      if (!validPassword) return null;

      return user;
    } catch (e) {
      return null;
    }
  }

  async login(user: User) {
    try {
      const payload = getPayLoad(user);

      return await {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      return formatError(e);
    }
  }

  async generateNewToken(user: User) {
    try {
      const payload = getPayLoad(user);

      return await {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      return formatError(e);
    }
  }

  async update(token: string, id: number, updatedUser: UpdateUserDto) {
    try {
      const onlyToken = token.split(' ');
      const tokenIsTruty = await this.jwtService.verify(onlyToken[1], {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (id == tokenIsTruty.sub) {
        const user = await this.userService.findById(id);
        await this.userRepository.merge(user, updatedUser);
        return await this.userRepository.save(user);
      } else {
        throw new UnauthorizedException('You can only update your data!');
      }
    } catch (e) {
      return formatError(e);
    }
  }

  async delete(token, id: number) {
    try {
      const onlyToken = token.split(' ');
      const tokenIsTruty = await this.jwtService.verify(onlyToken[1], {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (id == tokenIsTruty.sub) {
        const user = await this.userService.findById(id);
        await this.userRepository.remove(user);
        return null;
      } else {
        throw new UnauthorizedException('You can only update your data!');
      }
    } catch (e) {
      return formatError(e);
    }
  }
}
