import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';
import { UserService } from './user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserServiceModule {}
