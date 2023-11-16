import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { moduleOptions, swaggerConfig } from 'config/swagger.config';
import { Logger } from '@nestjs/common';
import { corsOption, HeaderOption } from 'config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['debug'],
  });
  const configService = app.get(ConfigService);
  const logger = new Logger();
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    moduleOptions,
  );
  const port = configService.get('PORT') || 8000;

  // swagger 연결
  SwaggerModule.setup('api', app, document);

  // base API 설정
  app.setGlobalPrefix('api');

  // cors 설정
  app.enableCors(corsOption);
  app.use(HeaderOption);

  // port 연결
  await app.listen(port);
  logger.log(
    `Application successfully running on ${process.env.NODE_ENV} PORT ${port}`,
  );
}

bootstrap();
