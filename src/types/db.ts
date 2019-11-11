export interface ITransactionContext {
  commit(): Promise<void>;
  rollback(): Promise<void>;
  query(query: string, params?: Array<string | number>): Promise<any>;
  release(): void;
}

export interface IDatabase {
  executeQuery(query: string, params?: Array<string | number>): Promise<any>;
  transaction(callback: (context: ITransactionContext) => void): void;
}
