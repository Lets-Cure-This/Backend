// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
// Data logic
import { DiseasesModule } from './data/diseases/diseases.module';
// Database Connection
// import { DefaultDBConfigService } from './config/default-db.config';
import { HerokuDBConfigService } from './config/heroku-db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/env.stage.${process.env.STAGE}`, 'env/.env'],
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: DefaultDBConfigService,
    //   inject: [DefaultDBConfigService,],
    // }),
    TypeOrmModule.forRootAsync({
      useClass: HerokuDBConfigService,
      inject: [HerokuDBConfigService,],
    }),
    DiseasesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
