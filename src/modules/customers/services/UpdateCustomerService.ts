import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { SALT } from '@shared/const';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';
import { Customer } from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  email: string;
  name: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one user with this email');
    }

    customer.name = name;
    customer.email = email;
    await customerRepository.save(customer);
    return customer;
  }
}

export { UpdateCustomerService };
