import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

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
    console.log(token); //TODO: add function to send email more later
  }
}

export { SendForgotPasswordEmailService };
