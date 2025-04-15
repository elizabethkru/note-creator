import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('The notes API description')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new BadRequestException(validationErrors);
      },
    }),
  );
  // app.useGlobalFilters(new BaseExceptionFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    explorer: true,
    swaggerOptions: {
      showRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
