// src/branches/branches.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Branch as BranchModel } from '@prisma/client';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<BranchModel[]> {
    return this.prisma.branch.findMany();
  }

  findOne(id: number): Promise<BranchModel | null> {
    return this.prisma.branch.findUnique({
      where: { brc_id: BigInt(id) },
    });
  }

  create(dto: CreateBranchDto) {
  return this.prisma.branch.create({
    data: {
      brc_name: dto.brc_name,
      brc_sale_id: dto.brc_sale_id,
      brc_supervisor: dto.brc_supervisor,
      brc_is_deleted: dto.brc_is_deleted ?? false, // ← boolean
      loc_id: dto.loc_id,                           // ← BigInt
    },
  });
}

  update(id: number, dto: UpdateBranchDto) {
  return this.prisma.branch.update({
    where: { brc_id: BigInt(id) },
    data: {
      ...(dto.brc_name !== undefined && { brc_name: dto.brc_name }),
      ...(dto.brc_sale_id !== undefined && { brc_sale_id: dto.brc_sale_id }),
      ...(dto.brc_supervisor !== undefined && { brc_supervisor: dto.brc_supervisor }),
      ...(dto.brc_is_deleted !== undefined && { brc_is_deleted: dto.brc_is_deleted }), // boolean
      ...(dto.loc_id !== undefined && { loc_id: dto.loc_id }),                          // BigInt
      brc_update_at: new Date(), // ถ้ายังไม่ได้ตั้ง @updatedAt
    },
  });
}

  remove(id: number): Promise<BranchModel> {
    return this.prisma.branch.delete({
      where: { brc_id: BigInt(id) },
    });
  }
}
