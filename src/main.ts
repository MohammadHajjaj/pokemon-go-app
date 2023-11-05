import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'yaml';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  const yamlDocument = YAML.parse(
    fs.readFileSync('./documentation/api.yaml', 'utf8'),
  );
  SwaggerModule.setup('api', app, yamlDocument);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8080);
  await app.listen(port);
}
bootstrap();
