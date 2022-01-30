import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: [
      'Cache-Control',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'x-api-token',
      'Access-Control-Allow-Headers',
      'Access-Control-Request-Method',
      'Authorization',
      'Authorized',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    maxAge: 60 * 60 * 24 * 365,
    preflightContinue: false,
  });
  await app.listen(3000);
}

bootstrap().then((r) => console.log(r));
