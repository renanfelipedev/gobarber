import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.get('/', AppointmentController.index);
appointmentsRouter.post('/', AppointmentController.store);

export default appointmentsRouter;
