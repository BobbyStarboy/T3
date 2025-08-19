import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    // origin: 'http://localhost:3000',
    origin: '*',
  });

  
  await app.listen(3001); // ✅ ให้รันบนพอร์ต 3001
  console.log(`🚀 Server is running on http://localhost:3001`);
}

bootstrap();
