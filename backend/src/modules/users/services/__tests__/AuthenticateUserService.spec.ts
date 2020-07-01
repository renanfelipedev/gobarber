import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUsersService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate user', async () => {
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
    await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'wrong.new.user@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'new.user@email.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
