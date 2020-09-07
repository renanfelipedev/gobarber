import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('it should be able to list the month availability from provider', async () => {
    for (let i = 1; i <= 18; i += 1) {
      fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 7, 10, i, 0, 0),
      });
    }

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 8,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 9,
          available: true,
        },
        {
          day: 10,
          available: false,
        },
        {
          day: 1,
          available: true,
        },
      ]),
    );
  });
});
