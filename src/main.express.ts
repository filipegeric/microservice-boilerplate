import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import { configure, getLogger } from 'log4js';

import { config } from './config';
import { userController } from './controllers';
import { makeExpressCallback } from './util/express.util';

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

const app = express();

app.get('/users/:username', makeExpressCallback(userController, 'getUser'));

app.listen(config.PORT, () => {
  logger.info(`Server working on port ${config.PORT}...`);
});
