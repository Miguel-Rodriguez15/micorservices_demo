import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../entities/inventory-service.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Contraseña@123',
  database: 'microservices_inventory',
  entities: [Product],
  synchronize: true,
};
