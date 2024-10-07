import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CustomerModule } from "./modules/customers/customers.module";
import { CheckAuthGuard } from "./guards";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, CustomerModule],
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
      inject: [ConfigService]
    }),
  ],

  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ]
})
export class AppModule { }
