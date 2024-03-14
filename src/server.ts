import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { UserRouter } from './user/routes/user.router';
import { ConfigServer } from './config/config';
import { Connection, DataSource, createConnection } from 'typeorm';

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.dbConnect()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    this.app.use('/api', this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router];
  }

  async dbConnect(): Promise<DataSource> {
    return await this.createDataSource().initialize();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

new ServerBootstrap();

// async function main() {
//   await AppDataSource.initialize()
//     .then(() => {
//       console.log('Data Source has been initialized!');
//     })
//     .catch((err) => {
//       console.error('Error during Data Source initialization', err);
//     });

//   const app: Express = appSetup();

//   app.listen(port, host);
// }

// main().then(() => {
//   console.log(`
//     [server]: Server is running at http://${host}:${port}
//     NODE_ENV: ${process.env.NODE_ENV}
//     `);
// });
