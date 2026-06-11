import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';

const expressApp = express();
let bootstrapPromise: Promise<void> | undefined;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

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

  await app.init();
}

export default async function handler(req: Request, res: Response) {
  bootstrapPromise ??= bootstrap();
  await bootstrapPromise;
  return expressApp(req, res);
}
