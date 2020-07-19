import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUsersService;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();
    createUser = new CreateUsersService(fakeUserRepository, fakeHashProvider);
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('shoud be able to show a user profile', async () => {
    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('New user');
    expect(profile.email).toBe('new.user@email.com');
    expect(profile.password).toBe('123123');
  });

  it('shoud not be able to show a not existing user profile ', async () => {
    await expect(
      showProfile.execute({
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
