import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from './notification.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  bday: Date;

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
