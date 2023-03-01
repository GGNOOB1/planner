import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Event } from './events.entity';
import { UpdateEventDto } from './dtos/update-event.dto';

import { _ } from 'lodash';
import { Location } from './location.entity';
import { validadeDays } from './validators/validadeDays';
import { QueryEvent } from './interfaces/QueryEvent';

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
  ) {}

  async create(
    description: string,
    userId: string,
    dateTime: Date,
    locationName: string,
    latitude: number,
    longitude: number,
  ) {
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

    return await this.eventRepository.save(event);
  }

  async find(
    dayOfTheWeek?: string,
    limit?: number,
    offset?: number,
    query?: QueryEvent,
  ) {
    if (!dayOfTheWeek && !limit && !offset && !query) {
      return this.eventRepository.find({ relations: ['location'] });
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
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  async findById(id: number) {
    const event = this.eventRepository.find({
      where: { id },
      relations: ['location'],
    });
    return event;
  }

  async update(id: number, data: UpdateEventDto) {
    const day = new Date(data.dateTime).getDay();
    const weekDay = this.daysWeek[day];
    data.weekDay = weekDay;

    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException('event not found');
    }
    Object.assign(event, data);
    return this.eventRepository.save(event);
  }

  async deleteOne(id: number) {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException('event not found');
    }

    return this.eventRepository.remove(event);
  }

  async delete(weekDay: string) {
    weekDay = _.capitalize(weekDay);
    const events = await this.eventRepository.find({ where: { weekDay } });

    if (!events) {
      throw new NotFoundException('event not found');
    }
    return this.eventRepository.remove(events);
  }
}
