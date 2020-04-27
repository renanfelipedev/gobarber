export default {
  jwt: {
    secret: process.env.SECRET || 's0m3un1qu3s7r1n6',
    expiresIn: '1d',
  },
};
