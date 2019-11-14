import 'reflect-metadata';

import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import { configure, getLogger } from 'log4js';
import { createConnection } from 'typeorm';

import { config } from './config';
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

createConnection()
  .then(() => {
    const app = fastify();

    const { userController } = require('./controllers');

    app.get('/users/:username', makeFastifyCallback(userController, 'getUser'));

    app.listen(config.PORT, () => {
      logger.info(`Server working on port ${config.PORT}...`);
    });
  })
  .catch(err => {
    logger.error(err);
    process.exit(-1);
  });
