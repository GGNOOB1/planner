import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Location } from './location.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  userId: number;
  @Column()
  dateTime: Date;
  @OneToOne(() => Location, (location) => location.event)
  @JoinColumn()
  location: Location;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  weekDay: string;
}
