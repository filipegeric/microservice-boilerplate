import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import { configure, getLogger } from 'log4js';

import { config } from './config';
import { userController } from './controllers';
import { makeFastifyCallback } from './util/fastify.util';

dotenvConfig();

configure({
  appenders: {
    out: { type: 'stdout' }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: process.env.NODE_ENV === 'test' ? 'off' : 'all'
    }
  }
});

const logger = getLogger('main.ts');

const app = fastify({ logger: true });

app.get('/users/:username', makeFastifyCallback(userController, 'getUser'));

app.listen(config.PORT, () => {
  logger.info(`Server working on port ${config.PORT}...`);
});
