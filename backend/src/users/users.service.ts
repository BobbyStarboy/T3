// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { user as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

function toPlain<T extends Record<string, any>>(row: T) {
  return JSON.parse(JSON.stringify(row, (_k, v) => typeof v === 'bigint' ? Number(v) : v));
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserModel[]> {
    const rows = await this.prisma.user.findMany();
    return rows.map(toPlain) as any;
  }

  async findOne(id: number): Promise<UserModel | null> {
    const row = await this.prisma.user.findUnique({ where: { usr_id: BigInt(id) } });
    return row ? (toPlain(row) as any) : null;
  }

  async create(dto: CreateUserDto): Promise<UserModel> {
    try {
    const row = await this.prisma.user.create({
      data: {
        usr_frame: dto.usr_frame,
        usr_name: dto.usr_name,
        usr_email: dto.usr_email,
        usr_password: dto.usr_password,
        usr_role_name: dto.usr_role_name,
        usr_phone: dto.usr_phone,
        usr_is_active: dto.usr_is_active,
        usr_del: dto.usr_del ?? BigInt(0),
      },
    });
    return toPlain(row) as any;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw the error to handle it in the controller
  }
}
  update(id: number, dto: UpdateUserDto): Promise<UserModel> {
    return this.prisma.user.update({
      where: { usr_id: BigInt(id) },
      data: {
        ...(dto.usr_frame !== undefined && { usr_frame: dto.usr_frame }),
        ...(dto.usr_name !== undefined && { usr_name: dto.usr_name }),
        ...(dto.usr_email !== undefined && { usr_email: dto.usr_email }),
        ...(dto.usr_password !== undefined && { usr_password: dto.usr_password }),
        ...(dto.usr_role_name !== undefined && { usr_role_name: dto.usr_role_name }),
        ...(dto.usr_phone !== undefined && { usr_phone: dto.usr_phone }),
        ...(dto.usr_is_active !== undefined && { usr_is_active: dto.usr_is_active }),
        ...(dto.usr_del !== undefined && { usr_del: dto.usr_del }),
        usr_update_at: new Date(),
      },
    });
  }

  delete(id: number): Promise<UserModel> {
    return this.prisma.user.delete({ where: { usr_id: BigInt(id) } });
  }
}
