import Container from 'typedi';
import { Connection, createConnection } from 'typeorm';
import dbConfig from '../configs/DbConfig';
import { LogicalError } from '../exceptions/LogicalError';
import { MessageError } from './../exceptions/MessageError';
import { IDbContext } from './IDbContext';

export class DbContext implements IDbContext {
    private _connection?: Connection;

    getConnection(): Connection {
        if (!this._connection || !this._connection.isConnected)
            throw new LogicalError(MessageError.PARAM_NOT_EXISTS, { t: 'database_connection' });
        return this._connection;
    }

    async createConnection(): Promise<Connection> {
        if (this._connection && this._connection.isConnected)
            return this._connection;

        this._connection = await createConnection({ ...dbConfig, name: 'default' } as any);
        return this._connection;
    }
}

Container.set<IDbContext>('db.context', new DbContext());