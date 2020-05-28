import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionController {
  async store(request: Request, response: Response): Promise<any> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;
    delete user.id;

    return response.json({ user, token });
  }
}

export default new SessionController();
