import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService
) {}

  async sendUserConfirmation() {
    const url = `auth/confirm?token`;
    const codeId = uuidv4();
    await this.mailerService.sendMail({
      to: 'danhtungit2@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'welcome', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: 'Henrry keo',
        url,
        code_id: codeId,
        expired: dayjs().add(2, 'minutes')
      },
    });
  }
}
