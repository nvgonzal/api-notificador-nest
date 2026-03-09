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
  getOne(id: number): User {
    //TODO: Conectar a db
  }
  update(id: number){
    //TODO: implementar db
  }
  delete(id: number){
    //TODO implenetar db
  }
}
