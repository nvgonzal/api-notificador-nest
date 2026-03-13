import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(user: User) {
    return this.users.push(user);
  }
  getAll(): User[] {
    return this.users;
  }
  getOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
  update(updatedUser: User) {
    this.users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      }
    });
  }
  delete(id: number) {
    this.users.filter((user) => user['id'] !== id);
  }
}
