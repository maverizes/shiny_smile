import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TelegrafModule } from "nestjs-telegraf";
import { SequelizeModule } from "@nestjs/sequelize";
import { APP_GUARD } from "@nestjs/core";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { UserModule } from "@modules";
import { CheckAuthGuard } from "@guards";
import { ProductModule } from "./modules/product/product.module";
import { CategoryModule } from "./modules/category";
import { BotModule } from "@client";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        dialect: 'postgres',
        host: cfg.get('db.host'),
        port: cfg.get<number>('db.port'),
        username: cfg.get('db.user'),
        password: cfg.get('db.password'),
        database: cfg.get('db.name'),
        sync: { alter: true, force: false },
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN
    }),
    BotModule,
    ProductModule,
    CategoryModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CheckAuthGuard,
    },
  ],
})
export class AppModule { }




