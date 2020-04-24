import 'dotenv/config';
import 'reflect-metadata';
import http from 'http';
import app from './app';

import './database';

const server = http.createServer(app);

server.listen(process.env.PORT || 3333, () => {
  console.log('Server running on port 3333');
});
