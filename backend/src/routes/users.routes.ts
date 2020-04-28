import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import UserController from '../controllers/UserController';
import AvatarController from '../controllers/AvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
