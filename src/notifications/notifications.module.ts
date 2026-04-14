import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entity/notification.entity';
import { NotificationProcessor } from './processors/notification.processor';
import { MailModule } from '../mail/mail.module';
import { UsersListener } from './listeners/users.listener';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications',
    }),
    TypeOrmModule.forFeature([Notification]),
    MailModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationProcessor, UsersListener],
  exports: [NotificationsService],
})
export class NotificationsModule {}
