import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('user not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileAlreadyExists =
        await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFilePath) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);
    return user;
  }
}

export { UpdateUserAvatarService };
