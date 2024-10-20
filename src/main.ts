import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './utils/filter/httpExceptionFilter';
import { config as dotenvConfig } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  dotenvConfig();
  await app.listen(3000);
}
bootstrap();
