import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      name,
      email,
      old_password,
      password,
      passwordConfirmation,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      email,
      name,
      old_password,
      password,
      passwordConfirmation,
    });

    delete user.password;

    return response.json(user);
  }
}

export default new ProfileController();
