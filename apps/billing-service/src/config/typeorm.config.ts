import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Invoice, InvoiceItem } from '../entities/billing-service.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Contraseña@123',
  database: 'microservices_billing',
  entities: [Invoice, InvoiceItem],
  synchronize: true,
};
