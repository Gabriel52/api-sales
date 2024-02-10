import { ListProductService } from '@modules/products/services/ListProductService';
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class UsersController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listUser = new ListProductService();

    const users = await listUser.execute();

    return response.status(200).json({ users });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    return response.json({ user });
  }
}

export { UsersController };
