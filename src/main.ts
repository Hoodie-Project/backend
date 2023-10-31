import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swagger.config';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const port = serverConfig.port;

  // swagger 연결
  SwaggerModule.setup('api', app, document);

  // base API 설정
  app.setGlobalPrefix('api');

  // port 연결
  await app.listen(port);
}

bootstrap();
