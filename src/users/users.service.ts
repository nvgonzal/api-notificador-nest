import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../notifications/events/user-registered.event';

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
    newUser.password = user.password;
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
      user.name = updatedUser.name;
      user.email = updatedUser.email;
      user.lastName = updatedUser.lastName;
      user.bday = updatedUser.bday;
      return this.userRepository.save(user);
    }
  }
  async delete(id: number) {
    return this.userRepository.delete(id);
  }
}
