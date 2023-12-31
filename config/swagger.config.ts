import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Hoodiev API')
  .setDescription('hoodiev API documentation')
  .setVersion('0.0.0')
  .addTag('user')
  .addTag('auth')
  .addTag('plan')
  .build();

// 함수 이름 단순화 옵션
export const moduleOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};
