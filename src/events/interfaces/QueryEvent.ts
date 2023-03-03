import { Location } from '../location.entity';

export interface QueryEvent {
  id?: number;
  description?: string;
  dateTime?: Date;
  location?: Location;
  createdAt?: Date;
  weekDay?: string;
}
