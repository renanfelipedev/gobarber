import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserController from '@modules/users/infra/http/controllers/UserController';
import AvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UserController.store);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  AvatarController.update,
);

export default usersRouter;
