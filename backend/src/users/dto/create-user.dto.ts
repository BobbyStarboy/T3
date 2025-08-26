import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString() @IsNotEmpty() usr_frame: string;
  @IsString() @IsNotEmpty() usr_name: string;
  @IsEmail()  @IsNotEmpty() usr_email: string;
  @IsString() @IsNotEmpty() usr_password: string;
  @IsString() @IsNotEmpty() usr_role_name: string;
  @IsString() @IsNotEmpty() usr_phone: string;

  // ใน schema เป็น String (เช่น 'Y'/'N') — ถ้าอยากเป็น boolean เปลี่ยน schema ทีหลัง
  @IsString() @IsNotEmpty() usr_is_active: string;

  // default เป็น 0 ถ้าไม่ส่งมา (BigInt)
  @Transform(({ value }) => value !== undefined ? BigInt(value) : BigInt(0))
  @IsOptional()
  usr_del?: bigint;
}
