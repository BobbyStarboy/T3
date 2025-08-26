import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import type { location as LocationModel } from '@prisma/client'; // 👈 type-only
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getAllLocations(): Promise<LocationModel[]> {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<LocationModel | null> {
    return this.locationsService.findOne(Number(id));
  }

  @Post()
  async createLocation(@Body() dto: CreateLocationDto): Promise<LocationModel> { // 👈 ใช้ DTO
    return this.locationsService.create(dto);
  }

  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,                                            // 👈 ใช้ DTO
  ): Promise<LocationModel> {
    return this.locationsService.update(Number(id), dto);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<LocationModel> {
    return this.locationsService.delete(Number(id));
  }
}
