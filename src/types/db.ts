import { MysqlError, QueryOptions } from 'mysql';

export interface ITransactionContext {
  commit(options?: QueryOptions, callback?: (err: MysqlError) => void): void;
  rollback(options?: QueryOptions, callback?: (err: MysqlError) => void): void;
  query(query: string, params: Array<string | number>): Promise<any>;
  release(): void;
}
