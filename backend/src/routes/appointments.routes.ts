import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.get('/', AppointmentController.index);
appointmentsRouter.post('/', AppointmentController.store);

export default appointmentsRouter;
