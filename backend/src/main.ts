import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const allowedOrigins = frontendUrl.split(',').map(url => url.trim().replace(/\/$/, '')); // Remove trailing slash
  
  if (!allowedOrigins.includes('https://cccc.cocsaigon.club')) {
    allowedOrigins.push('https://cccc.cocsaigon.club');
  }
  if (!allowedOrigins.includes('https://cccc-chatbot-frontend1.vercel.app')) {
    allowedOrigins.push('https://cccc-chatbot-frontend1.vercel.app');
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  await app.listen(3001);
}
bootstrap();
