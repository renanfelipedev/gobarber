import express from 'express';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from './config/upload';

import globalExceptionHandler from './middlewares/globalExceptionHandler';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

export default app;
