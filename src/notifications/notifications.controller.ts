import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // GET /notifications?userId=1
  @Get()
  findByUser(@Query('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.findByUser(userId);
  }

  // GET /notifications/unread?userId=1
  @Get('unread')
  findUnread(@Query('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.findUnreadByUser(userId);
  }

  // GET /notifications/unread/count?userId=1
  @Get('unread/count')
  countUnread(@Query('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.countUnread(userId);
  }

  // PATCH /notifications/:id/read?userId=1
  @Patch(':id/read')
  markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.notificationsService.markAsRead(id, userId);
  }

  // PATCH /notifications/read-all?userId=1
  @Patch('read-all')
  markAllAsRead(@Query('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.markAllAsRead(userId);
  }
}
