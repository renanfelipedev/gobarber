import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UserRepository from '../repositories/UsersRepository';

import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
