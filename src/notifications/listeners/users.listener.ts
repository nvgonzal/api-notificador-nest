import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export class UsersListener {
  private readonly logger = new Logger(UsersListener.name);

  constructor(
    @InjectQueue('notifications')
    private notificationsQueue: Queue,
  ) {}

  @OnEvent('user.registered')
  async handleUserRegistered(userRegisteredEvent: UserRegisteredEvent) {
    this.logger.log(
      `Received registered user ${userRegisteredEvent.name} ${userRegisteredEvent.email}`,
    );
    await this.notificationsQueue.add(
      'send-welcome-email',
      {
        userId: userRegisteredEvent.userId,
        email: userRegisteredEvent.email,
        name: userRegisteredEvent.name,
        type: 'welcome',
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }
}
