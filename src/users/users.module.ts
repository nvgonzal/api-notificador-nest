import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { LowercaseEmailPipe } from './pipes/lowercase-email.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, LowercaseEmailPipe],
  exports: [UsersService],
})
export class UsersModule {}
