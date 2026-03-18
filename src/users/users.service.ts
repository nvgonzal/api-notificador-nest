import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(user: CreateUserDto) {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.lastName = user.lastName;
    newUser.bday = user.bday;
    return this.userRepository.save(newUser);
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
      return  this.userRepository.save(user);
    }
  }
  async delete(id: number) {
    return  this.userRepository.delete(id);
  }
}
