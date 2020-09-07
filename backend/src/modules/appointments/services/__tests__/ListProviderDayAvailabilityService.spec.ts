import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('it should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 11, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 10,
      month: 8,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: true,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
      ]),
    );
  });

  it('it should not be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 11, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 10,
      month: 8,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: true,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
      ]),
    );
  });
});
