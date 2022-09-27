import { IsNotEmpty } from 'class-validator';

export class CreateRoleAndPermissionsDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  resources: string[];

  @IsNotEmpty()
  permissions: string[];
}

export class AddRoleToUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roles: string[];
}

export class CheckRoleDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  resource: string;

  @IsNotEmpty()
  permissions: string[];
}
