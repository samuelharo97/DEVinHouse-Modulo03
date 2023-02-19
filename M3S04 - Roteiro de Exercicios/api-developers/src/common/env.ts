import { EnvProps } from './interfaces';

export default (): EnvProps => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  database: {
    url: process.env.DB_URL,
  },
});
