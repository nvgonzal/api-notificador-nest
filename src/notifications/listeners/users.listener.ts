import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event';

export class UsersListener {
  @OnEvent('user.registered')
  handleUserRegistered(userRegisteredEvent: UserRegisteredEvent) {
    console.log(userRegisteredEvent);
  }
}
