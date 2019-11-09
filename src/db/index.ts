import { config } from '../config';
import { Database } from './database';
import { UserDb } from './user.db';

const db = new Database({
  database: config.DB_DATABASE,
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD
});
const userDb = new UserDb(db);

export { db, userDb };
