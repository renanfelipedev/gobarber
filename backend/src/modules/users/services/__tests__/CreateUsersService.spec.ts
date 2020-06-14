import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUsersService', () => {
  it('shoud be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
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

    expect(newUser).toHaveProperty('id');
  });

  it('shoul not be able to create a new user with same e-mail from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
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
      createUser.execute({
        name: 'New user',
        email: 'new.user@email.com',
        password: '123123',
        passwordConfirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create users without password confirmation', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createUser.execute({
        name: 'New user',
        email: 'new.user@email.com',
        password: '123123',
        passwordConfirmation: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create users that passwords dont match', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createUser.execute({
        name: 'New user',
        email: 'new.user@email.com',
        password: '123123',
        passwordConfirmation: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
