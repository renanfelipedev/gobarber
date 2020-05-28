import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@shared/container';
import '@shared/infra/typeorm';

import uploadConfig from '@config/upload';

import routes from '@shared/infra/http/routes';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

export default app;
