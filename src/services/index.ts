import { userDb } from '../db';
import { UserService } from './user.service';

const userService = new UserService(userDb);

export { userService };
