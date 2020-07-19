import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('it should be able to list all providers', async () => {
    const newUser = await fakeUsersRepository.create({
      name: 'New User',
      email: 'new.user@email.com',
      password: '123123',
    });

    const anotherUser = await fakeUsersRepository.create({
      name: 'Another User',
      email: 'another.user@email.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'logged.user@email.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([newUser, anotherUser]);
  });
});
