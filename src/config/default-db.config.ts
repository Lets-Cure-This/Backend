// Nest 
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DevelopmentDBConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService){}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'Development',
      type: "postgres",
      host: this.configService.get<string>('DEV_DB_HOST'),
      username: this.configService.get<string>('DEV_DB_USERNAME'),
      password: this.configService.get<string>('DEV_DB_PASSWORD'),
      port: this.configService.get<number>('DEV_DB_PORT'),
      database: this.configService.get<string>('DEV_DB_DATABASE'),
      // Fucking entities folder cant read ts files
      // so you need to grab the entities
      // from the dist folder 
      // https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
      entities: ["dist/**/*.entity.js"],
      autoLoadEntities: true,
      dropSchema: false,
      synchronize: true,
    };
  }

}
