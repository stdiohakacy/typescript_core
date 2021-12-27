import { DbConnection } from './DbTypes';

export interface IDbContext {
    getConnection(): DbConnection;

    createConnection(): Promise<DbConnection>;
}
