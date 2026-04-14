import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entity/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}
  async create(userId: number, type: string, message: string) {
    const notification = new Notification();
    notification.userId = userId;
    notification.message = message;
    notification.type = type;
    return this.notificationRepository.save(notification);
  }
}
