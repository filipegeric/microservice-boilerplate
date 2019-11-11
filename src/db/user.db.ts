import { User } from '../entity/user.entity';
import { HttpError } from '../error/http.error';
import { IDatabase } from '../types/db';

export class UserDb {
  constructor(private db: IDatabase) {}

  public async getUser(username: string) {
    const results = await this.db.executeQuery(
      'SELECT * FROM user WHERE username = ?',
      [username]
    );
    if (!results || results.length === 0) {
      throw new HttpError(404, 'No such user');
    }
    return new User(
      results[0].username,
      results[0].password,
      results[0].full_name
    );
  }
}
