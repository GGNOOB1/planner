import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
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
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return await {
      token: this.jwtService.sign(payload),
    };
  }
}
