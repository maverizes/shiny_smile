import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//RUN APPLICATION
async function startApp() {
  const app = await NestFactory.create(AppModule,);
  const cfg = app.get(ConfigService)

  // SET GLOBAL PREFIX
  app.setGlobalPrefix('/api/v1')

  const config = new DocumentBuilder()
    .setTitle('Shiny Smile Coffe Application')
    .setDescription('The Shiny Smile API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  // USE MORGAN ON DEVELOPMENT ENVIRONMENT
  if (process.env.NODE_ENV.trim() == 'development') {
    app.use(morgan('dev'))
  }

  await app.listen(cfg.get('port'), cfg.get('host'), () => {
    console.log("Server running on port:", cfg.get('port'));

  });
}

startApp()