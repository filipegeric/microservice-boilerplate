import { UserDb } from '../db/user.db';

export class UserService {
  constructor(private userDb: UserDb) {}

  public async getUser(username: string) {
    return this.userDb.getUser(username);
  }
}
