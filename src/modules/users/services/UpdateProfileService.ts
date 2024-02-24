import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { SALT } from '@shared/const';

interface IRequest {
  user_id: string;
  email: string;
  password?: string;
  name: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await userRepository.findById(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email');
    }
    if (password && !old_password) {
      throw new AppError('Old password is required');
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      user.password = await hash(password, SALT);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);
    return user;
  }
}

export { UpdateProfileService };
