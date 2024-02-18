import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: 'team@api-sales.com.br',
      to,
      subject: 'Password recovery',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview url: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMail };
