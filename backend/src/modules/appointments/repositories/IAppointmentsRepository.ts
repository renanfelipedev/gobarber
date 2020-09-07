import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import IFindAllAppointmentsInMonthFromProviderDTO from '../dtos/IFindAllAppointmentsInMonthFromProviderDTO';
import IFindAllAppointmentsInDayFromProviderDTO from '../dtos/IFindAllAppointmentsInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllAppointmentsInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllAppointmentsInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
