import 'dotenv/config';

export const port = Number(process.env.PORT) || 7000;
export const host = process.env.HOST || 'localhost';

process.env.NODE_ENV = process.env.NODE_ENV || '.develop.env';
