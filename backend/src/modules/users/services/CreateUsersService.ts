import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    name,
    password,
    passwordConfirmation,
  }: IRequest): Promise<User> {
    const checkUsersExists = await this.userRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new AppError('User already exists');
    }

    if (!passwordConfirmation) {
      throw new AppError('Password confirmation needed.');
    }

    if (password !== passwordConfirmation) {
      throw new AppError("Passwords don't match.");
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
