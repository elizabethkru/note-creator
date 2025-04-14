import { DataSource, DataSourceOptions } from 'typeorm';
// import { NoteSchema } from 'src/modules/tasks/infrastructure/schemas/note.schema';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenv.config();

export const typeormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [],
  // migrations: ['src/migrations/*.ts'],
};

export default registerAs('typeorm', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
