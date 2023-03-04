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
  HttpStatus,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { EventsService } from './events.service';
import { QueryEvent } from './interfaces/QueryEvent';
import { HttpCode } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { GetEventSwagger } from 'src/swagger/getEvent-swagger';
import { GlobalErrorSwagger } from '../swagger/global-errors-swagger';
import { ResponsePostEventSwagger } from 'src/swagger/postResponseEvent-swagger';
import { getOnlyEventSwagger } from 'src/swagger/getOnlyEvent-swagger';
import {
  status401,
  status403,
  status404,
  status204,
} from 'src/swagger/api-responses';

@ApiSecurity('bearerAuth')
@Controller('api/v1/events')
@UseGuards(AuthGuard('jwt'))
@ApiResponse({
  status: 401,
  description: 'unauthorized',
  type: GlobalErrorSwagger,
})
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetEventSwagger,
    isArray: true,
  })
  @ApiResponse(status404)
  @ApiResponse(status401)
  @ApiQuery({ name: 'dayOfTheWeek', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  getAllEvents(
    @Query('dayOfTheWeek') weekday: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query() query: QueryEvent,
  ) {
    return this.eventService.find(weekday, limit, offset, query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'This route is to get an event from its id' })
  @ApiResponse(status404)
  @ApiResponse(status401)
  @ApiResponse({
    status: 201,
    description: 'success',
    type: GetEventSwagger,
    isArray: true,
  })
  async getEventById(@Param('id') id: string) {
    const event = await this.eventService.findById(parseInt(id));

    if (!event) {
      throw new NotFoundException('event not found');
    }

    return event;
  }

  @Post()
  @ApiBody({ type: CreateEventDto })
  @ApiOperation({
    summary: 'This route is to create an event with the mandatory fields',
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: ResponsePostEventSwagger,
    isArray: true,
  })
  @ApiResponse(status401)
  @ApiResponse(status403)
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

  @Put('/:id')
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: getOnlyEventSwagger,
    isArray: true,
  })
  @ApiResponse(status401)
  @ApiResponse(status403)
  @ApiOperation({ summary: 'This route is for updating events based on id' })
  updateEvent(@Param('id') id, @Body() body: UpdateEventDto) {
    return this.eventService.update(id, body);
  }

  @Put('/:id/location')
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: ResponsePostEventSwagger,
    isArray: true,
  })
  @ApiResponse(status401)
  @ApiResponse(status403)
  @ApiOperation({
    summary: 'This route is for updating location based on id of event',
  })
  updateLocationByEventId(
    @Param('id') eventId: number,
    @Body()
    locations: UpdateLocationDto,
  ) {
    return this.eventService.updateLocation(eventId, locations);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'This route is to delete an event through id as a parameter.',
  })
  @ApiResponse(status404)
  @ApiResponse(status204)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEventById(@Param('id') id: number) {
    return this.eventService.deleteOne(id);
  }

  @Delete()
  @ApiResponse(status204)
  @ApiOperation({
    summary:
      'This route is for excluding events based on the day of the week provided as a parameter in the url',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEventByWeekDay(@Query('dayOfTheWeek') dayWeek: string) {
    return this.eventService.delete(dayWeek);
  }
}
