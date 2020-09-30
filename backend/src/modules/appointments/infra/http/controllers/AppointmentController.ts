import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

class AppointmentController {
  async index(request: Request, response: Response): Promise<any> {
    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
  }

  async store(request: Request, response: Response): Promise<any> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();
