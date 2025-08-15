import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BranchesService } from './branches.service';
import type { Branch } from '@prisma/client';        // 👈 import แบบ type
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  async getAllBranches(): Promise<Branch[]> {
    return this.branchesService.findAll();
  }

  @Get(':id')
  async getBranchById(@Param('id') id: string): Promise<Branch | null> {
    return this.branchesService.findOne(Number(id));
  }

  @Post()
  async createBranch(@Body() dto: CreateBranchDto): Promise<Branch> {   // 👈 ใช้ DTO
    return this.branchesService.create(dto);
  }

  @Patch(':id')
  async updateBranch(
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,                                       // 👈 ใช้ DTO
  ): Promise<Branch> {
    return this.branchesService.update(Number(id), dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Branch> {
    return this.branchesService.remove(Number(id));
  }
}
