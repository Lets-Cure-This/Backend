// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
// Data logic
import { DiseasesModule } from './data/diseases/diseases.module';
// Database Connection
// import { DefaultDBConfigService } from './config/default-db.config';
import { DatabaseConfigService } from './config/database.config';
import { databaseValidationSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/env.stage.${process.env.STAGE}`, 'env/.env'],
      validationSchema: databaseValidationSchema
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: DefaultDBConfigService,
    //   inject: [DefaultDBConfigService,],
    // }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService,],
    }),
    DiseasesModule
  ],
  controllers: [],
  providers: [DatabaseConfigService],
})
export class AppModule {}
