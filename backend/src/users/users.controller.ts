// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import type { user as UserModel } from '@prisma/client';   // 👈 type-only
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserModel> {   // 👈 ใช้ DTO
    return this.usersService.create(dto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,                                        // 👈 ใช้ DTO
  ): Promise<UserModel> {
    return this.usersService.update(Number(id), dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.delete(Number(id));
  }
}
