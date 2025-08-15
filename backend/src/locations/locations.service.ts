import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { location as LocationModel } from '@prisma/client';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<LocationModel[]> {
    return this.prisma.location.findMany();
  }

  findOne(id: number): Promise<LocationModel | null> {
    return this.prisma.location.findUnique({ where: { loc_id: BigInt(id) } });
  }

  create(dto: CreateLocationDto): Promise<LocationModel> {
    return this.prisma.location.create({
      data: {
        loc_name: dto.loc_name,
        loc_lat: dto.loc_lat,
        loc_long: dto.loc_long,
        loc_address: dto.loc_address,
        loc_tel_num: dto.loc_tel_num,
        loc_province: dto.loc_province,
        // ถ้ายังไม่ได้ตั้ง default ใน schema:
        loc_created_by: new Date(),
        loc_created_at: new Date(),
        loc_update_at: new Date(),
      },
    });
  }

  update(id: number, dto: UpdateLocationDto): Promise<LocationModel> {
    return this.prisma.location.update({
      where: { loc_id: BigInt(id) },
      data: {
        ...(dto.loc_name !== undefined && { loc_name: dto.loc_name }),
        ...(dto.loc_lat !== undefined && { loc_lat: dto.loc_lat }),
        ...(dto.loc_long !== undefined && { loc_long: dto.loc_long }),
        ...(dto.loc_address !== undefined && { loc_address: dto.loc_address }),
        ...(dto.loc_tel_num !== undefined && { loc_tel_num: dto.loc_tel_num }),
        ...(dto.loc_province !== undefined && { loc_province: dto.loc_province }),
        loc_update_at: new Date(),
      },
    });
  }

  delete(id: number): Promise<LocationModel> {
    return this.prisma.location.delete({ where: { loc_id: BigInt(id) } });
  }
}
