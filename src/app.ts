import Container from 'typedi';
import { ApiService } from './ApiService';
import { ENABLE_API_SERVICE } from './configs/Configuration';
import { IDbContext } from './database/IDbContext';
import './SingletonRegister';

const dbContext = Container.get<IDbContext>('db.context');

const startApplication = async (): Promise<void> => {
  await dbContext.createConnection();
  if(ENABLE_API_SERVICE)
    new ApiService().setup()
}

startApplication()
  .then(() => console.log(`Express server start on port ${3000}`))
  .catch(err => console.log(err))