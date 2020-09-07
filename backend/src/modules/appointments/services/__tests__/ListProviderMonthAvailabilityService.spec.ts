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
    const month = 12;
    const year = 2020;
    const day = 11;

    const START_HOUR = 8;
    const END_HOUR = 18;

    for (
      let hourly_schedule = START_HOUR;
      hourly_schedule <= END_HOUR;
      hourly_schedule += 1
    ) {
      fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(year, month - 1, day, hourly_schedule, 0, 0),
      });
    }

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month,
      year,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 9,
          available: true,
        },
        {
          day: 11,
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
