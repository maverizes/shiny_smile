import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UploadService } from '../upload';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model';
import { MeService } from './me.service';
import { MeController } from './me.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UploadService,MeService],
  controllers: [UserController, MeController],
})
export class UserModule {}
