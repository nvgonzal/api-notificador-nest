import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    this.logger.log(`Enviando email de bienvenida a ${email}`);

    await this.mailerService.sendMail({
      to: email,
      subject: '¡Bienvenido a Notification System!',
      template: './welcome', // busca welcome.hbs en la carpeta templates
      context: {
        // variables disponibles en el template
        name,
        year: new Date().getFullYear(),
      },
    });

    this.logger.log(`Email de bienvenida enviado a ${email}`);
  }
}
