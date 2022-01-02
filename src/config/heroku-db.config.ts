// Nest 
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class HerokuDBConfigService implements TypeOrmOptionsFactory {
  private isProduction: boolean;

  constructor(private configService: ConfigService){
    this.isProduction = this.configService.get('STAGE') === 'prod';
  }


  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'Heroku',
      type: "postgres",
      host: this.configService.get<string>('HEROKU_DB_HOST'),
      username: this.configService.get<string>('HEROKU_DB_USERNAME'),
      password: this.configService.get<string>('HEROKU_DB_PASSWORD'),
      port: this.configService.get<number>('HEROKU_DB_PORT'),
      database: this.configService.get<string>('HEROKU_DB_DATABASE'),
      ssl: this.isProduction,
      extra: {
        ssl: this.isProduction ? { rejectUnauthorized: false }: null,
      },
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
