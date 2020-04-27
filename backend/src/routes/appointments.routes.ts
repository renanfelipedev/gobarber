import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

appointmentsRouter.get('/', AppointmentController.index);
appointmentsRouter.post('/', AppointmentController.store);

export default appointmentsRouter;
