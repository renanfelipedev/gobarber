import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id?: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[] | undefined> {
    const users = await this.usersRepository.findAllProviders({
      except_user_self_id: user_id,
    });

    return users;
  }
}

export default ListProvidersService;
