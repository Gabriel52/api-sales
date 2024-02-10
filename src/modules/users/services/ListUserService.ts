import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const productsRepository = getCustomRepository(UserRepository);
    const products = productsRepository.find();

    return products;
  }
}

export { ListUserService };
