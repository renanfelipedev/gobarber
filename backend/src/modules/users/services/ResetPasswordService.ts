import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<void> {
    const token = await this.userTokensRepository.findByToken(data.token);

    if (!token) {
      throw new AppError('User does not exists');
    }

    const user = await this.userRepository.findById(token.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = token.created_at;
    const now = Date.now();
    const afterTwoHour = addHours(tokenCreatedAt, 2);

    if (isAfter(now, afterTwoHour)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(data.password);

    this.userRepository.save(user);
  }
}

export default ResetPasswordService;
