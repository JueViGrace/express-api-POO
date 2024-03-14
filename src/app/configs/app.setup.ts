import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import routes from '../routes/app.routes';

export const appSetup = (): Express => {
  const app = express();

  app.use(morgan('dev'));

  app.use(cors());

  app.use(express.json());

  // app.use('/api', routes);

  app.use('/health', async (_req: Request, res: Response) => {
    res.send({ message: 'health OK!' });
  });

  return app;
};
