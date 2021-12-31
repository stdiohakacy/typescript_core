import './SingletonRegister';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import Container from 'typedi';
import { CategoryController } from './controller/CategoryControlller';
import { IDbContext } from './database/IDbContext';
let app = express();

const dbContext = Container.get<IDbContext>('db.context');
const startApplication = async (): Promise<void> => {
  await dbContext.createConnection();
  useExpressServer(app, {
    controllers: [CategoryController],
  });
  app.listen(3000);
}

startApplication().then(result => console.log(result)).catch(err => console.log(err))