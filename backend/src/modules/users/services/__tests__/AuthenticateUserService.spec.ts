import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    const loggedUser = await authenticateUser.execute({
      email: 'new.user@email.com',
      password: '123123',
    });

    expect(loggedUser).toHaveProperty('token');
    expect(loggedUser.user).toEqual(newUser);
  });

  it('should not be able to authenticate a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    expect(
      authenticateUser.execute({
        email: 'wrong.new.user@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    expect(
      authenticateUser.execute({
        email: 'new.user@email.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
