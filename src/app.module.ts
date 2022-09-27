import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ActionModule } from './action/action.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './utils/database/database.providers';
import { AuthorizationModule } from './authorization/authorization.module';
import { DatabaseModule } from './utils/database/database.module';
import { NodeAclService } from './utils/node-acl/node-acl.service';

@Module({
  imports: [
    UserModule,
    ActionModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthorizationModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync(connectionOptions),
  ],
  controllers: [AppController],
  providers: [AppService, NodeAclService],
})
export class AppModule {}
