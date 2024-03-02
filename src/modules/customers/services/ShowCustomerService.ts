import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { Customer } from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found');
    }

    return customer;
  }
}

export { ShowCustomerService };
