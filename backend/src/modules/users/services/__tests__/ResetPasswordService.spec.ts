import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('shoud be able to reset the password from a existing user', async () => {
    const newUser = await fakeUsersRepository.create({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(newUser.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '123321', token });

    const updatedUser = await fakeUsersRepository.findById(newUser.id);

    expect(generateHash).toHaveBeenCalledWith('123321');
    expect(updatedUser?.password).toBe('123321');
  });

  it('shoud not be able to reset a password with non-existing token', async () => {
    expect(
      resetPasswordService.execute({
        password: 'some random password',
        token: 'non existing token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to reset from a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordService.execute({
        password: 'some random password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset a password if passed more than 2 hours', async () => {
    const newUser = await fakeUsersRepository.create({
      name: 'New user',
      email: 'new.user@email.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(newUser.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
