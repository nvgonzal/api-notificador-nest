import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'users';
  }
  @Post()
  create(data) {
    //
  }
  @Get(':id')
  findOne() {
    return 'user';
  }
  @Post(':id')
  update(data) {
    return 'user';
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'user';
  }
}
