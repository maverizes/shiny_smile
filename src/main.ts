import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

//RUN APPLICATION
async function startApp() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const cfg = app.get(ConfigService)

  // SET GLONBAL PREFIX
  app.setGlobalPrefix('/api/v1')

  // USE MORGAN ON DEVELOPMENT ENVIRONMENT
  if (process.env.NODE_ENV.trim() == 'development') {
    app.use(morgan('dev'))
  }

  await app.listen(cfg.get('port'), cfg.get('host'), () => {
    console.log("Server running on port:", cfg.get('port'));

  });
}

startApp()