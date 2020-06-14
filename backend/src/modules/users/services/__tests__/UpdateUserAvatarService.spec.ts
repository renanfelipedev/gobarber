import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

describe('UpdateUserAvatarService', () => {
  it('shoud be able to update user avatar image', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const createUser = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const updateAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should delete old avatar when updating to a new one', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const createUser = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const updateAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await createUser.execute({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
      passwordConfirmation: '123123',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new_avatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('new_avatar.jpg');
  });

  it('should not be able to update avatar from a non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateAvatar.execute({
        user_id: '1',
        avatarFilename: 'new_avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
