import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.store);

export default sessionsRouter;
