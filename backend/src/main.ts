import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // Removes all properties not in the DTO
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'https://chat.lexiechoi.com'],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
