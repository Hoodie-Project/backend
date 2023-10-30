import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const databaseConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_HOSTNAME || dbConfig.port,
  username: process.env.RDS_HOSTNAME || dbConfig.username,
  password: process.env.RDS_HOSTNAME || dbConfig.password,
  database: process.env.RDS_HOSTNAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
