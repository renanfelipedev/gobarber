import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from './config/upload';

import globalExceptionHandler from './middlewares/globalExceptionHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

export default app;
