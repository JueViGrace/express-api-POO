import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: Boolean(String(process.env.DB_SYNCHRONIZE)),
  logging: Boolean(process.env.DB_LOGGING),
  // autoLoadEntities: true,
  entities: [__dirname + '/../../**/*.entity.ts'],
});
