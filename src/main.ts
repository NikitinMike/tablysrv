import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as https from 'https';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as express from 'express';

async function bootstrap() {
  // https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8
  // https://sourceforge.net/projects/openssl-for-windows/
  const httpsOptions = {
    key: fs.readFileSync('C:\\OpenSSL\\SSL\\localhost.key', 'utf8'),
    cert: fs.readFileSync('C:\\OpenSSL\\SSL\\localhost.crt', 'utf8'),
  };

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
  await app.init();

  http.createServer(server).listen(3000);
  https.createServer(httpsOptions, server).listen(443);
}

bootstrap().then((r) => console.log(r));
