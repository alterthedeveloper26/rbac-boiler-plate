import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ActionModule } from './action/action.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/env.config';

@Module({
  imports: [
    PermissionModule,
    RoleModule,
    UserModule,
    ActionModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
