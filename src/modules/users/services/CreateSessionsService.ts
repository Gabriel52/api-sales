import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import authConfig from '@config/auth';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET_HASH, TIME_TOKEN_VALIDATION } from '@shared/const';

interface IRequest {
  password: string;
  email: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ password, email }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect validations`, 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError(`Incorrect validations`, 401);
    }
    const payload = {};
    // have never put a sensible data in the payload
    const token = sign(payload, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}

export { CreateSessionsService };
