import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Event } from './events.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  locationName: string;
  @Column()
  latitude: number;
  @Column()
  longitude: number;

  @JoinColumn()
  @OneToOne(() => Event, (event) => event.location)
  event: Event;
}
