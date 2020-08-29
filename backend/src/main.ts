import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusinessExceptionFilter } from './common/filters/business-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalFilters(
    new BusinessExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  await app.listen(8080);
}
bootstrap();
