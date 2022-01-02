// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
// Data logic
import { DiseasesModule } from './data/diseases/diseases.module';
// Database Connection
// import { DefaultDBConfigService } from './config/default-db.config';
import { PgDatabaseConfigService } from './config/pg.database.config';
import { databaseValidationSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`, `.env`],
      validationSchema: databaseValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PgDatabaseConfigService,
      inject: [PgDatabaseConfigService, ConfigService,],
    }),
    DiseasesModule
  ],
  controllers: [],
  providers: [PgDatabaseConfigService],
})
export class AppModule {}
