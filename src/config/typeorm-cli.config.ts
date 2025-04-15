import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { typeormConfig } from './typeorm.config';

typeormConfig.entities = [
  'src/modules/*/infrastructure/schemas/*.schema.{ts,js}',
  'dist/modules/*/infrastructure/schemas/*.schema.{ts,js}',
];

export default registerAs('typeorm', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
