import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

class CreateUserService {
  public async execute({
    email,
    name,
    password,
    passwordConfirmation,
  }: Request): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const checkUsersExists = await userRepository.findOne({ where: { email } });

    if (checkUsersExists) {
      throw new Error('User already exists');
    }

    if (!passwordConfirmation) {
      throw new Error('Password confirmation needed.');
    }

    if (password !== passwordConfirmation) {
      throw new Error("Passwords don't match.");
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
