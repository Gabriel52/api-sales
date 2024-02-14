import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const avatarFileName = request.file.filename;
    const { id } = request.user;
    const createUser = new UpdateUserAvatarService();

    const user = await createUser.execute({ avatarFileName, userId: id });
    return response.json({ user });
  }
}

export { UserAvatarController };
