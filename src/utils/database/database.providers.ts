import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<'mongodb'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        authSource: configService.get<string>('DB_AUTH_SOURCE'),
      });
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
  {
    provide: 'MONGO_CLIENT',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const type = configService.get<string>('DB_TYPE') as 'mongodb';
      const host = configService.get<string>('DB_HOST');
      const port = configService.get<number>('DB_PORT');
      const username = configService.get<string>('DB_USERNAME');
      const password = configService.get<string>('DB_PASSWORD');
      const database = configService.get<string>('DB_NAME');
      const autoLoadEntities = true;
      const synchronize = false;
      const authSource = configService.get<string>('DB_AUTH_SOURCE');

      return await new Promise((resolve, reject) => {
        MongoClient.connect(
          `mongodb://root:example@localhost:27017/?authMechanism=DEFAULT&authSource=admin`,
          function (err, client) {
            if (err) reject(err);
            resolve(client.db(database));
          },
        );
      });
    },
    inject: [ConfigService],
  },
];

export const connectionOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      type: configService.get<string>('DB_TYPE') as 'mongodb',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: false,
      authSource: configService.get<string>('DB_AUTH_SOURCE'),
    };
  },
  inject: [ConfigService],
};
