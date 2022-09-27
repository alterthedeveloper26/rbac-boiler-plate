import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { AuthorizationService } from './authorization.service';
import {
  AddRoleToUserDto,
  CheckRoleDto,
  CreateRoleAndPermissionsDto,
} from './dto/dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(protected readonly authorizationService: AuthorizationService) {}

  @Post('/role/permissions')
  createRoleAndPermissions(@Body() dto: CreateRoleAndPermissionsDto) {
    const { role, resources, permissions } = dto;
    this.authorizationService.createRoleAndPermissions(
      role,
      resources,
      permissions,
    );
  }

  @Post('user/roles/add')
  addRoleToUser(@Body() dto: AddRoleToUserDto) {
    const { userId, roles } = dto;
    this.authorizationService.addRoleToUser(userId, roles);
  }

  @Get(':role')
  getUserWhoHasThisRole(@Param('role') role: string) {
    console.log('Hello cac bro');
    return this.authorizationService.getUserWhoHasThisRole(role);
  }

  @Get('/user/accessible')
  amIAccessible(@Body() dto: CheckRoleDto) {
    console.log('Hello cac bro');
    return this.authorizationService.amICanDoThis(dto);
  }
}
