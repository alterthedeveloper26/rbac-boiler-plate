import { Inject, Injectable } from '@nestjs/common';
import { NodeAclService } from 'src/utils/node-acl/node-acl.service';
import { CheckRoleDto } from './dto/dto';

@Injectable()
export class AuthorizationService {
  protected readonly aclService: any;
  constructor(protected readonly nodeAclService: NodeAclService) {
    this.aclService = nodeAclService.getAclInstance();
  }

  createRoleAndPermissions(
    role: string,
    resources: string[],
    permissions: string[],
  ) {
    // console.log('Current instance: ', this.aclService);
    this.aclService.allow(role, resources, permissions, (result) => {
      console.log(result);
    });
  }

  addRoleToUser(userId: string, roles: string[]) {
    this.aclService.addUserRoles(userId, roles, (result) => {
      return result;
    });
  }

  getUserWhoHasThisRole(role: string) {
    return this.aclService.roleUsers(role, (result) => {
      console.log(role);
      console.log('result: ', result);
      return result;
    });
  }

  amICanDoThis(dto: CheckRoleDto) {
    const { userId, permissions, resource } = dto;

    return this.aclService.isAllowed(
      userId,
      resource,
      permissions,
      (err, res) => {
        if (err) console.log('Error: ', err);

        if (res) {
          return {
            message: 'Tatada!!!',
          };
        }
      },
    );
  }
}
