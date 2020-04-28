import crypto from 'crypto';

const hash = crypto.randomBytes(20).toString('hex');

export default {
  jwt: {
    secret: process.env.SECRET || hash,
    expiresIn: '1d',
  },
};
