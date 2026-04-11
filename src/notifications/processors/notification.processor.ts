import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('notification')
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);
  async process(job: Job): Promise<any> {
    switch (job.name) {
      case 'send-welcome-email':
        return this.handleWelcomeEmail(job);
    }
  }
  private async handleWelcomeEmail(job: Job) {
    this.logger.log(
      `Procesando job ${job.id}: email de bienvenida para ${job.data.userEmail}`,
    );
    this.logger.log(`Datos del job: ${JSON.stringify(job.data)}`);
  }
}
