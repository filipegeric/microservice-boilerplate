import { MysqlError, QueryOptions } from 'mysql';

export interface ITransactionContext {
  commit(options?: QueryOptions, callback?: (err: MysqlError) => void): void;
  rollback(options?: QueryOptions, callback?: (err: MysqlError) => void): void;
  query(query: string, params: Array<string | number>): Promise<any>;
  release(): void;
}

export interface IDatabase {
  executeQuery(query: string, params: Array<string | number>): Promise<any>;
  transaction(callback: (context: ITransactionContext) => void): void;
}
