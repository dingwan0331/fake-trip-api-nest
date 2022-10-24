import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env.MYSQL_HOST,
  port: 3306,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  entities: [__dirname + '../../**/*.entity.{js,ts}'],
  synchronize: Boolean(env.MYSQL_SYNC),
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
};
