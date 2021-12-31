import Container from 'typedi';
import { ApiService } from './ApiService';
import { IDbContext } from './database/IDbContext';
import './SingletonRegister';

const dbContext = Container.get<IDbContext>('db.context');

const startApplication = async (): Promise<void> => {
  await dbContext.createConnection();
  new ApiService().setup()
  // useExpressServer(app, {
  //   controllers: [CategoryController],
  // });
  // app.listen(3000);
}

startApplication()
  .then(() => console.log(`Express server start on port ${3000}`))
  .catch(err => console.log(err))