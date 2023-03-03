import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventsService } from './events.service';
import { QueryEvent } from './interfaces/QueryEvent';

@Controller('api/v1/events')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  getAllEvents(
    @Query('dayOfTheWeek') weekday: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query() query: QueryEvent,
  ) {
    return this.eventService.find(weekday, limit, offset, query);
  }

  @Post()
  createEvent(@Body() body: CreateEventDto) {
    return this.eventService.create(
      body.description,
      body.userId,
      body.dateTime,
      body.locationName,
      body.latitude,
      body.longitude,
    );
  }

  @Delete()
  deleteEventByWeekDay(@Query('dayOfTheWeek') dayWeek: string) {
    return this.eventService.delete(dayWeek);
  }

  @Get('/:id')
  async getEventById(@Param('id') id: string) {
    const event = await this.eventService.findById(parseInt(id));

    if (!event) {
      throw new NotFoundException('event not found');
    }

    return event;
  }

  @Put('/:id')
  updateEvent(@Param('id') id, @Body() body: UpdateEventDto) {
    return this.eventService.update(id, body);
  }

  @Delete('/:id')
  deleteEventById(@Param('id') id: number) {
    return this.eventService.deleteOne(id);
  }
}
