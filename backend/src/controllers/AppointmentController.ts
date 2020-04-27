import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

class AppointmentController {
  async index(request: Request, response: Response): Promise<any> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
  }

  async store(request: Request, response: Response): Promise<any> {
    try {
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new AppointmentController();
