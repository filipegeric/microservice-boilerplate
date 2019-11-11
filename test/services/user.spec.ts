import { expect } from 'chai';
import { internet, name } from 'faker';
import { stub } from 'sinon';

import { UserDb } from '../../src/db/user.db';
import { User } from '../../src/entity/user.entity';
import { HttpError } from '../../src/error/http.error';
import { UserService } from '../../src/services/user.service';

describe('UserService', () => {
  let service: UserService;

  before(() => {
    const db = {
      async executeQuery() {
        //
      },
      transaction() {
        //
      }
    };
    const userDb = new UserDb(db);
    service = new UserService(userDb);
  });
  describe('getUser', () => {
    it('returns a user', async () => {
      const username = internet.userName();
      const mockUser = new User(
        username,
        internet.password(),
        name.firstName()
      );
      const stubFn = stub(UserDb.prototype, 'getUser').returns(
        Promise.resolve(mockUser)
      );
      const user = await service.getUser(username);

      expect(user).to.be.instanceOf(User);
      expect(user).to.be.eql(mockUser);

      stubFn.restore();
    });

    it('fails if there is no user', done => {
      const username = internet.userName();
      const stubFn = stub(UserDb.prototype, 'getUser').throws(HttpError);
      service
        .getUser(username)
        .then(done)
        .catch(() => done());

      stubFn.restore();
    });
  });
});
