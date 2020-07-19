import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUsersService;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();
    createUser = new CreateUsersService(fakeUserRepository, fakeHashProvider);
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('shoud be able to update user name and e-mail', async () => {
    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Changed User Name',
      email: 'changed.user.mail@email.com',
    });

    expect(updatedUser.name).toBe('Changed User Name');
    expect(updatedUser.email).toBe('changed.user.mail@email.com');
  });

  it('shoud not be able to update a not existing user profile ', async () => {
    await expect(
      updateProfile.execute({
        user_id: '1',
        name: 'Non existing user',
        email: 'non.existing@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to an already used e-mail', async () => {
    await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    const user = await createUser.execute({
      name: 'Another user',
      email: 'another.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Another user',
        email: 'new.user@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to update user password', async () => {
    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Changed User Name',
      email: 'changed.user.mail@email.com',
      old_password: '123123',
      password: '321321',
      passwordConfirmation: '321321',
    });

    expect(updatedUser.password).toBe('321321');
  });

  it('shoud not be able to update user password without old password', async () => {
    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Changed User Name',
        email: 'changed.user.mail@email.com',
        password: '321321',
        passwordConfirmation: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update user password with a wrong old password', async () => {
    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Changed User Name',
        email: 'changed.user.mail@email.com',
        old_password: '111222',
        password: '321321',
        passwordConfirmation: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update user password with a wrong password confirmation', async () => {
    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Changed User Name',
        email: 'changed.user.mail@email.com',
        old_password: '123123',
        password: '321321',
        passwordConfirmation: '321123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
