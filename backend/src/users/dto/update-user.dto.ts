import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from 'generated/prisma';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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

  @IsBoolean()
  usr_is_active?: boolean;

  @IsEnum(UserRoleEnum)
  usr_role_name?: UserRoleEnum;

  @IsNumber()
  usr_del?: bigint;
}
