import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const token = await userTokenRepository.generate(user.id);
    await EtherealMail.sendMail({
      to: email,
      body: `Request to change the password receive, use this toke to validation: ${token.token}`,
    });
  }
}

export { SendForgotPasswordEmailService };
