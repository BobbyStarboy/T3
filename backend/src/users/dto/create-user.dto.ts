import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRoleEnum } from '@prisma/client';

export class CreateUserDto {
  @IsNumber()
  usr_id: number;

  @IsEmail()
  usr_email: string;

  @IsString()
  usr_firstName: string;

  @IsString()
  usr_lastName: string;

  @IsString()
  usr_googleId: string;

  @IsString()
  usr_avatar?: string | undefined;

  @IsString()
  usr_phone?: string;

  @IsString()
  usr_is_active?: boolean;

  @IsEnum(UserRoleEnum)
  usr_role_name?: UserRoleEnum;

  @IsNumber()
  usr_del?: number;
}
