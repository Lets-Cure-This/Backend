import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Look here for why it's important
  //  to add ValidationPipes to the controllers
  // https://stackoverflow.com/questions/60616889/class-validator-doesnt-appear-to-do-anything-in-nestjs-application
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
