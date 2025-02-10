import { Module } from '@nestjs/common';
import { CustomerServiceController } from './customer-service.controller';
import { CustomerService } from './customer-service.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer-service.entity';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [CustomerServiceController],
  providers: [CustomerService],
})
export class CustomerServiceModule {}
