import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import * as acl from 'acl';

@Injectable()
export class NodeAclService {
  constructor(
    @Inject('MONGO_CLIENT')
    protected readonly mongoClient: Db,
  ) {}

  getAclInstance() {
    console.log('What de hell: ', this.mongoClient);
    return new acl(new acl.mongodbBackend(this.mongoClient, '_acl'));
  }
}
