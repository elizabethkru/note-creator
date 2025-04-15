import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenv.config();

export const typeormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5732'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,
  logging: true,
  synchronize: true,
  entities: [] as string[], // Добавьте сюда вашу схему
};

export default registerAs('typeorm', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
