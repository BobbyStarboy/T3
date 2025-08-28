import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Unique user identifier',
    example: 12345,
    type: 'number',
  })
  @IsNumber()
  usr_id: number;

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  usr_email: string;

  @ApiPropertyOptional({
    description: 'User first name',
    example: 'John',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  usr_firstName: string;

  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  usr_lastName: string;

  @ApiPropertyOptional({
    description: 'Google OAuth identifier',
    example: '1234567890123456789',
  })
  @IsString()
  usr_googleId: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  @IsString()
  usr_avatar?: string | undefined;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsString()
  usr_phone?: string;

  @ApiPropertyOptional({
    description: 'Whether the user account is active',
    example: true,
    default: true,
  })
  @IsBoolean()
  usr_is_active?: boolean;

  @ApiPropertyOptional({
    description: 'User role in the system',
    enum: UserRoleEnum,
    example: UserRoleEnum.CEO,
    default: UserRoleEnum.SALES,
  })
  @IsEnum(UserRoleEnum)
  usr_role_name?: UserRoleEnum;

  @ApiPropertyOptional({
    description: 'Soft delete flag (0 = active, 1 = deleted)',
    example: 0,
    default: 0,
  })
  @IsNumber()
  usr_del?: number;
}
