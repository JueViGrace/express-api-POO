import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnviroment(k: string): string | undefined {
    return process.env[k];
  }

  public getNumberEnv(k: string): number {
    return Number(this.getEnviroment(k));
  }

  public getBooleanEnv(k: string): boolean {
    return Boolean(this.getEnviroment(k));
  }

  public get nodeEnv(): string {
    return this.getEnviroment('NODE_ENV')?.trim() || '';
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ['env'];

    if (path.length > 0) {
      const stringToArray = path.split('.');
      arrEnv.unshift(...stringToArray);
    }

    return '.' + arrEnv.join('.');
  }

  public get typeORMConfig(): DataSourceOptions {
    return {
      type: 'mysql',
      host: this.getEnviroment('DB_HOST'),
      port: this.getNumberEnv('DB_PORT'),
      username: this.getEnviroment('DB_USER'),
      password: this.getEnviroment('DB_PASSWORD'),
      database: this.getEnviroment('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      synchronize: this.getBooleanEnv('DB_SYNCHRONIZE'),
      logging: this.getBooleanEnv('DB_LOGGIN'),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  public createDataSource(): DataSource {
    return new DataSource(this.typeORMConfig);
  }
}