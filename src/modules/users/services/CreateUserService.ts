import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import { SALT } from '@shared/const';

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
    const hashedPassword = await hash(password, SALT);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
