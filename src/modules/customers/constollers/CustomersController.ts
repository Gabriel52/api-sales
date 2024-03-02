import { Response, Request } from 'express';
import { ListCustomerService } from '../services/ListCustomerService';
import { ShowCustomerService } from '../services/ShowCustomerService';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { UpdateCustomerService } from '../services/UpdateCustomerService';

export default class CustomersController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();
    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCustomers = new ShowCustomerService();

    const customers = await showCustomers.execute({ id });
    return response.json(customers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });
    return response.json({ message: 'Customer deleted successfully' });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomers = new CreateCustomerService();

    const customer = await createCustomers.execute({ name, email });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({ id, name, email });
    return response.json(customer);
  }
}
