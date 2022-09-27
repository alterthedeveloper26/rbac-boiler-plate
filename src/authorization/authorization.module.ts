import { Module } from '@nestjs/common';
import { NodeAclModule } from 'src/utils/node-acl/node-acl.module';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';

@Module({
  imports: [NodeAclModule],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
