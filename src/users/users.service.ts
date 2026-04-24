import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../notifications/events/user-registered.event';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(user: CreateUserDto) {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.lastName = user.lastName;
    newUser.bday = user.bday;
    newUser.password = await bcrypt.hash(user.password, 12);
    const userSaved = await this.userRepository.save(newUser);
    this.eventEmitter.emit(
      'user.registered',
      new UserRegisteredEvent(userSaved.id, userSaved.email, userSaved.name),
    );
    return userSaved;
  }
  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  getOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  async update(updatedUser: UpdateUserDto, id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      Object.assign(user, updatedUser);
      return this.userRepository.save(user);
    }
  }
  async delete(id: number) {
    return this.userRepository.delete(id);
  }
  async validateCredentials(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }
}
