import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { Product } from './entities/inventory-service.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [InventoryServiceController],
  providers: [InventoryService],
})
export class InventoryServiceModule {}
