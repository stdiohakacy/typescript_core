import 'reflect-metadata';
import * as routingController from 'routing-controllers';
import * as typeorm from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import './database/DbContext';

/* Tell TypeORM to use the container provided by this lib to resolve it's dependencies. */
typeorm.useContainer(Container);
/* Its important to set container before any operation you do with routing-controllers, including importing controllers */
routingController.useContainer(Container);
