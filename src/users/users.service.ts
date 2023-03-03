import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/updatePassword-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { formatError } from 'src/helpers/formatErrors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createdUserDto: CreateUserDto) {
    try {
      if (createdUserDto.password !== createdUserDto.confirmPassword) {
        throw new BadRequestException('Passwords are not equal');
      }

      const user = await this.userRepository.create(createdUserDto);
      await this.userRepository.save(user);
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        city: user.city,
        country: user.country,
        email: user.email,
      };
    } catch (e) {
      return formatError(e);
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      return user;
    } catch (e) {}
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      return user;
    } catch (e) {
      return null;
    }
  }

  async updatePassword(userData, body: UpdatePasswordDto) {
    try {
      const user = await this.findOne(userData.email);
      const passwordEqual = await bcrypt.compare(body.password, user.password);

      if (body.password !== body.passwordConfirm) {
        throw new BadRequestException(
          'The passwords are different, the confirm password needs to be the same as the password',
        );
      }
      if (passwordEqual) {
        throw new BadRequestException(
          'the new password is the same as the current, enter a different from the current',
        );
      }

      const newPassword = await bcrypt.hash(body.password, 12);
      user.password = newPassword;
      await this.userRepository.save(user);
    } catch (e) {
      return formatError(e);
    }
  }
}
