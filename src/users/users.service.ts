import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './users.entity';

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
      return await this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async update(id: number, updatedUser: UpdateUserDto) {
    const user = await this.findById(id);
    this.userRepository.merge(user, updatedUser);
    return await this.userRepository.save(user);
  }
}
