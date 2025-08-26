// src/branches/dto/create-branch.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  brc_name: string;

  @IsString()
  @IsNotEmpty()
  brc_sale_id: string;

  @IsString()
  @IsNotEmpty()
  brc_supervisor: string;

  @Transform(({ value }) => BigInt(value))  // loc_id เป็น BigInt ใน schema
  @IsNotEmpty()
  loc_id: bigint;

  @IsBoolean()
  @IsOptional()
  brc_is_deleted?: boolean;                 // ← ตอนนี้เป็น boolean แล้ว
}
