import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { UserRouter } from './user/router/user.router';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';
import { PurchaseRouter } from './purchase/router/purchase.router';
import { ProductRouter } from './product/router/product.router';
import { CustomerRouter } from './customer/router/customer.router';
import { CategoryRouter } from './category/router/category.router';

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
    return [
      new UserRouter().router,
      new PurchaseRouter().router,
      new ProductRouter().router,
      new CustomerRouter().router,
      new CategoryRouter().router,
    ];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`
      [server]: Server is running at ${this.port}
      `);
    });
  }
}

new ServerBootstrap();
