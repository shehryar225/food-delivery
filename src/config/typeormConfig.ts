import { DataSource,DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Customer } from 'src/modules/customer/entities/customer.entity';

config();

const configService = new ConfigService();
console.log(configService.get('DB_HOST'))

export const dbConfig = ():DataSourceOptions => {
  return {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username:configService.get('DB_USERNAME'),
  password:configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [`${__dirname}/../database/migrations/*.ts`],
  migrationsTableName: 'migrations',
  synchronize:false,
  logging:false
}
}

export const AppDataSource = new DataSource(dbConfig());