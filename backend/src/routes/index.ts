import { Router } from 'express';

import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
