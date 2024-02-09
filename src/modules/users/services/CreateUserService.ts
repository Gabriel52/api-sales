import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, password, email }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailAlreadyExists = await userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError(`Email address already exists`);
    }

    const user = userRepository.create({ name, email, password });

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
