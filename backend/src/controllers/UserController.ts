import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUsersService';

class UserController {
  async store(request: Request, response: Response): Promise<any> {
    const { name, email, password, passwordConfirmation } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      passwordConfirmation,
    });

    delete user.password;

    return response.json(user);
  }
}

export default new UserController();
