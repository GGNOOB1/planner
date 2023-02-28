import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  _id: number;
  @Column()
  description: string;
  @Column()
  userId: string;
  @Column()
  dateTime: Date;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  weekDay: string;
}
