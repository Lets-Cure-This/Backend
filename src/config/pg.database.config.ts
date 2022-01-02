// Nest 
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PgDatabaseConfigService implements TypeOrmOptionsFactory {
  private isProduction: boolean;
  private host: string;
  private username: string;
  private password: string; 
  private port: number;
  private db: string;

  constructor(private configService: ConfigService){
    // Meta Logic
    this.isProduction = this.configService.get('STAGE') === 'prod';

    // Database Variables
    this.host = this.configService.get('DB_HOST');
    this.username = this.configService.get('DB_USERNAME');
    this.password = `${this.configService.get('DB_PASSWORD')}`;
    this.port = this.configService.get('DB_PORT');
    this.db = this.configService.get('DB_DATABASE');
  }


  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'lets-cure-this',
      type: "postgres",
      host: this.host,
      username: this.username,
      password: this.password,
      port: this.port,
      database: this.db,
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

