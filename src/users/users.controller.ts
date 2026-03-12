import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'all users';
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //Todo: Crear usuario en base de datos
    return 'create user';
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return 'user with id ' + id;
  }
  @Post(':id')
  update(@Param('id') id: number) {
    return 'update user with id ' + id;
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return 'remove user with id ' + id;
  }
}
