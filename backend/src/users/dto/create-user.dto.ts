import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRoleEnum } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: 12345,
    type: 'number',
  })
  @IsNumber()
  usr_id: number;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  usr_email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  usr_firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  usr_lastName: string;

  @ApiProperty({
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
  @IsString()
  usr_is_active?: boolean;

  @ApiPropertyOptional({
    description: 'User role in the system',
    enum: UserRoleEnum,
    example: UserRoleEnum.SALES_SUPERVISOR,
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
