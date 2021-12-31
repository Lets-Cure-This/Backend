// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
// Data logic
import { DiseasesModule } from './data/diseases/diseases.module';
// Database Connection
import { DefaultDBConfigService } from './config/default-db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DefaultDBConfigService,
      inject: [DefaultDBConfigService,],
    }),
    DiseasesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
