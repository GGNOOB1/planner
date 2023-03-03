import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { EventsController } from './events.controller';
import { Event } from './events.entity';
import { EventsService } from './events.service';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location, User])],
  controllers: [EventsController],
  providers: [EventsService, UsersService],
})
export class EventsModule {}
