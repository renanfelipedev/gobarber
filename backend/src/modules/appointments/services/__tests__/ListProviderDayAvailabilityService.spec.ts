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
    const day = 9;
    const month = 12;
    const year = 2020;

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(year, month - 1, day, 16, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(year, month - 1, day, 13, 0, 0);
      return customDate.getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day,
      month,
      year,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 12,
          available: false,
        },
        {
          hour: 13,
          available: false,
        },
        {
          hour: 14,
          available: true,
        },
        {
          hour: 15,
          available: true,
        },
        {
          hour: 16,
          available: false,
        },
      ]),
    );
  });
});
