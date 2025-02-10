import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Supplier } from '../entities/supplier-service.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Contraseña@123',
  database: 'microservices_supplier',
  entities: [Supplier],
  synchronize: true,
};
