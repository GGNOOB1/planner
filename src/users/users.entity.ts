import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
} from 'typeorm';

import { hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  birthDate: Date;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column()
  @Index({ unique: true })
  email: string;
  @Column()
  password: string;

  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 12);
  }
}
