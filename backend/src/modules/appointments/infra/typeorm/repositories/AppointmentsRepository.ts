import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return foundAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = await this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async find(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }
}

export default AppointmentsRepository;
