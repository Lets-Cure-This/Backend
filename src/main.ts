// NestJS
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// App Logic
import { AppModule } from './app.module';
// Interceptor logic
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Look here for why it's important
  //  to add ValidationPipes to the controllers
  // https://stackoverflow.com/questions/60616889/class-validator-doesnt-appear-to-do-anything-in-nestjs-application
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.nestPort || 3000);

  Logger.log(`Application listening on port ${process.env.nestPort}`);
}
bootstrap();
