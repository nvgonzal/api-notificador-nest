import { Injectable } from '@nestjs/common';
import {User} from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(user: User) {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.lastName = user.lastName;
    newUser.bday = user.bday;
    await this.userRepository.save(newUser);
  }
  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  getOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  async update(updatedUser: User, id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      user.name = updatedUser.name;
      user.email = updatedUser.email;
      user.lastName = updatedUser.lastName;
      user.bday = updatedUser.bday;
      await this.userRepository.save(user);
    }
  }
  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}
