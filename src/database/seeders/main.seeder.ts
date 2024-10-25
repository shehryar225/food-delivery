

import { faker } from '@faker-js/faker';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userssFactory = factoryManager.get(Customer);

    console.log('seeding users...');
    const users = await userssFactory.saveMany(10);

    console.log('seeding properties...');
  }
}
