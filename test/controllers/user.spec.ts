import { expect } from 'chai';
import { internet, name } from 'faker';
import { stub } from 'sinon';

import { UserController } from '../../src/controllers/user.controller';
import { UserDb } from '../../src/db/user.db';
import { User } from '../../src/entity/user.entity';
import { HttpError } from '../../src/error/http.error';
import { UserService } from '../../src/services/user.service';

describe('User Controller', () => {
  let controller: UserController;

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
    const userService = new UserService(userDb);
    controller = new UserController(userService);
  });

  describe('getUser', () => {
    it('returns a user and status code 200', async () => {
      const username = internet.userName();
      const stubUser = new User(
        username,
        internet.password(),
        name.firstName()
      );
      const stubFn = stub(UserDb.prototype, 'getUser').callsFake(() =>
        Promise.resolve(stubUser)
      );

      const response = await controller.getUser({
        body: null,
        params: {
          username
        },
        ip: internet.ip(),
        query: null
      });

      expect(response.status).to.be.eql(200);
      expect(response.data).to.be.eql(stubUser);

      stubFn.restore();
    });

    it('fails when there is no user with provided username', done => {
      const username = internet.userName();
      const stubFn = stub(UserDb.prototype, 'getUser').throws(HttpError);

      controller
        .getUser({
          body: null,
          params: {
            username
          },
          ip: internet.ip(),
          query: null
        })
        .then(done)
        .catch(() => done());

      stubFn.restore();
    });
  });
});
