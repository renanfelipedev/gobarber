import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  async store(request: Request, response: Response): Promise<any> {
    try {
      const { email, password } = request.body;
      const authenticateUser = new AuthenticateUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password;
      delete user.id;

      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new SessionController();
