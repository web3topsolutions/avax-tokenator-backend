import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() 
    .setTitle('Token API')
    .setDescription('API for creating tokens')
    .setVersion('1.0')
    .addTag('token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to DTO instances
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
