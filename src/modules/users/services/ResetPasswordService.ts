import { isAfter, addHours } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { SALT, TIME_TO_TOKEN_VALIDATION_EMAIL } from '@shared/const';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists.');
    }
    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDAte = addHours(tokenCreateAt, TIME_TO_TOKEN_VALIDATION_EMAIL);

    if (isAfter(Date.now(), compareDAte)) {
      throw new AppError('Token expired');
    }
    user.password = await hash(password, SALT);
    userRepository.save(user);
  }
}

export { ResetPasswordService };
