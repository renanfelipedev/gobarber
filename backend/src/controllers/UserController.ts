import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUsersService';

class UserController {
  async store(request: Request, response: Response): Promise<any> {
    try {
      const { name, email, password, passwordConfirmation } = request.body;
      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
        passwordConfirmation,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
