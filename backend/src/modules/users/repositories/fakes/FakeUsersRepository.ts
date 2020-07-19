import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  async findAllProviders({
    except_user_self_id,
  }: IFindAllProvidersDTO): Promise<User[] | undefined> {
    let { users } = this;

    if (except_user_self_id) {
      users = this.users.filter(user => user.id !== except_user_self_id);
    }

    return users;
  }

  async create(userData: ICreateUsersDTO): Promise<User> {
    const user = new User();
    const { name, email, password } = userData;

    Object.assign(user, {
      id: uuid(),
      name,
      password,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
