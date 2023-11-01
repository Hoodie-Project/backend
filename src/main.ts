import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swagger.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const port = configService.get('PORT') || 8000;

  // swagger 연결
  SwaggerModule.setup('api', app, document);

  // base API 설정
  app.setGlobalPrefix('api');

  // port 연결
  await app.listen(port);
  logger.log(`Application successfully running on ${port}`);
}

bootstrap();
