import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { NodeAclService } from './node-acl.service';

@Module({
  imports: [DatabaseModule],
  exports: [NodeAclService],
  providers: [NodeAclService],
})
export class NodeAclModule {}
