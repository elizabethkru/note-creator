import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
import { NoteSchema } from 'src/modules/tasks/infrastructure/schemas/note.schema';
dotenv.config();

export const typeormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  synchronize: true,
  entities: [NoteSchema], // Добавьте сюда вашу схему
  migrations: ['src/migrations/*.ts'],
};

export default registerAs('typeorm', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
