import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';
import { SALT } from '@shared/const';

interface IRequest {
  password: string;
  email: string;
}

interface IResponse {
  user: User;
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

    return { user };
  }
}

export { CreateSessionsService };
