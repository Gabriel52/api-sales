import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositoty';
import AppError from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productAlreadyExists = await productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError(`There is already one product with this name`);
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export { CreateProductService };
