import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { UpdateEventDto } from './dtos/update-event.dto';

import { _ } from 'lodash';
import { Location } from './location.entity';
import { validadeDays } from './validators/validadeDays';
import { QueryEvent } from './interfaces/QueryEvent';

import { UsersService } from 'src/users/users.service';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { formatError } from '../helpers/formatErrors';

@Injectable()
export class EventsService {
  daysWeek = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  };

  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private userService: UsersService,
  ) {}

  async create(
    description: string,
    userId: number,
    dateTime: Date,
    locationName: string,
    latitude: number,
    longitude: number,
  ) {
    try {
      const user = await this.userService.findById(userId);

      if (!user) {
        throw new BadRequestException('The user id does not exist');
      }

      const day = new Date(dateTime).getDay();
      const weekDay = this.daysWeek[day];

      const location = this.locationRepository.create({
        locationName,
        latitude,
        longitude,
      });
      await this.locationRepository.save(location);

      const event = this.eventRepository.create({
        description,
        userId,
        dateTime,
        weekDay,
        location,
      });

      await this.eventRepository.save(event);

      return {
        id: event.id,
        description: event.description,
        userId: event.userId,
        dateTime: event.dateTime,
        createdAt: event.createdAt,
        location: event.location,
      };
    } catch (e) {
      return formatError(e);
    }
  }

  async find(
    dayOfTheWeek?: string,
    limit?: number,
    offset?: number,
    query?: QueryEvent,
  ) {
    try {
      if (!dayOfTheWeek && !limit && !offset && !query) {
        const events = await this.eventRepository.find({
          relations: ['location'],
        });

        return events;
      }

      if (dayOfTheWeek) {
        dayOfTheWeek = _.capitalize(dayOfTheWeek);
        dayOfTheWeek = validadeDays(dayOfTheWeek);

        const events = await this.eventRepository
          .createQueryBuilder('event')
          .leftJoinAndSelect('event.location', 'location')
          .where('event.weekDay = :dayOfTheWeek', { dayOfTheWeek })
          .limit(limit)
          .offset(offset)
          .getMany();

        return {
          limit,
          offset,
          total: events.length,
          items: events,
        };
      }

      const events = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.location', 'location')
        .limit(limit)
        .offset(offset)
        .getMany();

      return {
        limit,
        offset,
        total: events.length,
        items: events,
      };
    } catch (e) {
      return formatError(e);
    }
  }

  async findOne(id: number) {
    try {
      return await this.eventRepository.findOneBy({ id });
    } catch (e) {}
  }

  async findById(id: number) {
    try {
      const event = this.eventRepository.find({
        where: { id },
        relations: ['location'],
      });
      return event;
    } catch (e) {
      return formatError(e);
    }
  }

  async update(id: number, updatedEvent: UpdateEventDto) {
    try {
      const day = new Date(updatedEvent.dateTime).getDay();
      const weekDay = this.daysWeek[day];
      updatedEvent.weekDay = weekDay;

      const event = await this.findOne(id);

      if (!event) {
        throw new NotFoundException({
          message: 'event not found',
        });
      }
      Object.assign(event, updatedEvent);
      return this.eventRepository.save(event);
    } catch (e) {
      return formatError(e);
    }
  }

  async updateLocation(eventId: number, locations: UpdateLocationDto) {
    try {
      const event = await this.findById(eventId);
      event[0].location.locationName = locations.locationName;
      event[0].location.latitude = locations.latitude;
      event[0].location.longitude = locations.longitude;
      await this.locationRepository.save(event[0].location);
    } catch (e) {
      return formatError(e);
    }
  }

  async deleteOne(id: number) {
    try {
      const event = await this.findOne(id);

      if (!event) {
        throw new NotFoundException('event not found');
      }

      return this.eventRepository.remove(event);
    } catch (e) {}
  }

  async delete(weekDay: string) {
    try {
      weekDay = _.capitalize(weekDay);
      const events = await this.eventRepository.find({ where: { weekDay } });

      if (!events) {
        throw new NotFoundException('event not found');
      }
      await this.eventRepository.remove(events);

      return null;
    } catch (e) {
      return formatError(e);
    }
  }
}
