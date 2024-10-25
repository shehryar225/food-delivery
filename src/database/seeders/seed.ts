
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';


import { dbConfig } from 'src/config/typeormConfig';
import { MainSeeder } from './main.seeder';
import { UserFactory } from './seeding/user.factory';


const options: DataSourceOptions & SeederOptions = {
    ...dbConfig(),
    factories: [UserFactory],
    seeds: [MainSeeder],
  };
  
export const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});