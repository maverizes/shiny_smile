import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, dbConfig]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (cfg: ConfigService) => ({
      dialect: 'postgres',
      host: cfg.get('db.host'),
      port: cfg.get<number>('db.port'),
      username: cfg.get('db.user'),
      password: cfg.get('db.password'),
      name: cfg.get('db.name'),
      sync: { alter: true, force: false },
      models: [],
    }),
    inject: [ConfigService]
  })
  ],
})
export class AppModule { }