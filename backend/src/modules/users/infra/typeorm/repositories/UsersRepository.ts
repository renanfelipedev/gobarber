import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'avatar',
        'password',
        'created_at',
        'updated_at',
      ],
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findAllProviders({
    except_user_self_id,
  }: IFindAllProvidersDTO): Promise<User[] | undefined> {
    let users: User[];

    if (except_user_self_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_self_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  async create(userData: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
