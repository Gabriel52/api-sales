import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSessionsService();

    const { user, token } = await createSession.execute({ email, password });
    return response.status(200).json({ user, token });
  }
}

export { SessionsController };
