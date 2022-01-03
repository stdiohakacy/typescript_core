import 'reflect-metadata';
import './database/DbContext';
import './database/DbRegister';
import './ServiceRegister';
import * as routingController from 'routing-controllers';
import * as typeorm from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

/* Tell TypeORM to use the container provided by this lib to resolve it's dependencies. */
typeorm.useContainer(Container);
/* Its important to set container before any operation you do with routing-controllers, including importing controllers */
routingController.useContainer(Container);
