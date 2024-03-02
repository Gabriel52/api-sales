import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';
import { Customer } from '../typeorm/entities/Customer';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const emailAlreadyExists = await customersRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new AppError(`Email address already exists`);
    }

    const user = customersRepository.create({
      name,
      email,
    });
    await customersRepository.save(user);

    return user;
  }
}

export { CreateCustomerService };
