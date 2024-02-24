import { Request, Response } from 'express';
import { ShowProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ user_id });

    return response.status(200).json({ user });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });
    return response.json({ user });
  }
}

export { ProfileController };
