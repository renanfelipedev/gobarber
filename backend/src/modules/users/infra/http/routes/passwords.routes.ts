import { Router } from 'express';

import PasswordController from '@modules/users/infra/http/controllers/PasswordController';

const passwordRouter = Router();

passwordRouter.post('/forgot', PasswordController.store);
passwordRouter.post('/reset', PasswordController.update);

export default passwordRouter;
