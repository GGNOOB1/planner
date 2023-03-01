import * as Joi from 'joi';
import { NotFoundException } from '@nestjs/common';

export function validadeDays(dayOfTheWeek) {
  const weekDaySchema = Joi.object({
    weekDay: Joi.string().valid(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ),
  });

  const data = {
    weekDay: dayOfTheWeek,
  };
  const result = weekDaySchema.validate(data);
  if (result.error) {
    throw new NotFoundException('event not found');
  }

  return dayOfTheWeek;
}
