import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

let year: number;
let month: number;
let day: number;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    year = 2020;
    month = 10;
    day = 12;

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(year, month, day, 10).getTime());

    const appointment = await createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(year, month, day, 11),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider');
    expect(appointment.user_id).toBe('user');
  });

  it('shoult not be able to create two appointments on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(year, month, day, 10).getTime());

    const appointmentDate = new Date(year, month, day, 11);

    await createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment on past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(year, month, day).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(year, month, day - 1),
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(year, month, day).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(year, month, day + 1),
        user_id: 'user',
        provider_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not ble able to create an appointment before 8pm and after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(year, month, day).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(year, month, day, 7),
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(year, month, day, 18),
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
