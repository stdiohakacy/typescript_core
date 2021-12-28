import { DB_HOST, DB_NAME, DB_PORT, DB_TYPE, DB_USER, DB_PASS } from './Configuration';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

export default {
    name: 'default',
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    cache: {},
    synchronize: false,
    logging: true,
    entities: [ path.join(__dirname, '../entity/*{.js,.ts}') ]
    // entities: [
    //     path.join(__dirname, '../infras/data/typeorm/entities/**/*{.js,.ts}')
    // ],
    // migrations: [
    //     path.join(__dirname, '../infras/data/typeorm/migrations/*{.js,.ts}')
    // ],
    // subscribers: [
    //     path.join(__dirname, '../infras/data/typeorm/subscribers/*{.js,.ts}')
    // ],
    // cli: {
    //     entitiesDir: path.join(__dirname, '../').replace(process.cwd(), '.') + '/infras/data/typeorm/entities',
    //     migrationsDir: path.join(__dirname, '../').replace(process.cwd(), '.') + '/infras/data/typeorm/migrations',
    //     subscribersDir: path.join(__dirname, '../').replace(process.cwd(), '.') + '/infras/data/typeorm/subscribers'
    // }
} as ConnectionOptions;
