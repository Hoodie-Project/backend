import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Plan example')
  .setDescription('The plan API description')
  .setVersion('1.0')
  .addTag('plans')
  .build();
