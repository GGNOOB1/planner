import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { EventsController } from './events.controller';
import { Event } from './events.entity';
import { EventsService } from './events.service';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
