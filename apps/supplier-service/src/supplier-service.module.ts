import { Module } from '@nestjs/common';
import { SupplierServiceController } from './supplier-service.controller';
import { SupplierServiceService } from './supplier-service.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { Supplier } from './entities/supplier-service.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Supplier]),
  ],
  controllers: [SupplierServiceController],
  providers: [SupplierServiceService],
})
export class SupplierServiceModule {}
