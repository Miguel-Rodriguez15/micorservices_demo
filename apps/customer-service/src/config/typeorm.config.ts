import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from '../entities/customer-service.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Contraseña@123',
  database: 'microservices_customer',
  entities: [Customer],
  synchronize: true,
};
