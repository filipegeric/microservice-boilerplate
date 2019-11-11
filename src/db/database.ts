import { createPool, Pool, PoolConfig, PoolConnection } from 'mysql';

import { IDatabase, ITransactionContext } from '../types/db';

export class Database implements IDatabase {
  private dbClient: Pool;

  constructor(config: PoolConfig) {
    this.dbClient = createPool(config);
  }

  public executeQuery(
    query: string,
    params: Array<string | number> = []
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbClient.query(query, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  public transaction(callback: (context: ITransactionContext) => void) {
    this.dbClient.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.beginTransaction(error => {
        if (error) {
          throw error;
        }
        callback({
          commit: connection.commit,
          query: this.makeExecuteConnectionQuery(connection),
          rollback: connection.rollback,
          release: connection.release
        });
      });
    });
  }

  private makeExecuteConnectionQuery(
    connection: PoolConnection
  ): (query: string, params: Array<string | number>) => Promise<any> {
    return (query, params) => {
      return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      });
    };
  }
}
