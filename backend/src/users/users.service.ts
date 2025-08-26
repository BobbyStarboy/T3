// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { user as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<UserModel | null> {
    return this.prisma.user.findUnique({ where: { usr_id: BigInt(id) } });
  }

  create(dto: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({
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
