import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(geojson: any) {
    try {
      if (!geojson || !geojson.geometry || !geojson.properties) {
        throw new Error('The type of request must be GeoJSON');
      }
      // Extract
      const properties = geojson.properties || {};
      const geometry = geojson.geometry || {};

      // Assign
      const location = {
        loc_name: properties.name || '',
        loc_lat: geometry.coordinates ? geometry.coordinates[1] : null,
        loc_long: geometry.coordinates ? geometry.coordinates[0] : null,
        loc_address: properties.address || '',
        loc_postcode: properties.postcode || '',
        loc_subdistrict: properties.subdistrict || '',
        loc_district: properties.district || '',
        loc_province: properties.province || '',
        loc_geojson: geojson,
        createdBy: properties.createdBy || 'system',
      };

      // Create
      return await this.prisma.$transaction(async (tx) => {
        // Push basic info
        const loc = await tx.location.create({
          data: location,
        });
        return loc; // Return the created location object
      });
    } catch (error) {
      throw new Error(`Failed to create location: ${error.message}`);
    }
  }

  async createMany(geojson: any) {
    if (!geojson || !geojson.features || !Array.isArray(geojson.features)) {
      throw new Error('The type of request must be GeoJSON');
    }

    const locations = geojson.features.map((feature: any) => {
      const properties = feature.properties || {};
      const geometry = feature.geometry || {};

      return {
        loc_name: properties.name || '',
        loc_lat: geometry.coordinates ? geometry.coordinates[1] : null,
        loc_long: geometry.coordinates ? geometry.coordinates[0] : null,
        loc_address: properties.address || '',
        loc_postcode: properties.postcode || '',
        loc_subdistrict: properties.subdistrict || '',
        loc_district: properties.district || '',
        loc_province: properties.province || '',
        loc_geojson: feature,
        createdBy: properties.createdBy || 'system',
      };
    });

    return await this.prisma.location.createMany({
      data: locations,
      skipDuplicates: true, // Avoid inserting duplicates
    });
  }

  async findAll() {
    try {
      const locations = await this.prisma.location.findMany();

      // Convert to GeoJSON Feature Collection
      const geojson = {
        type: 'FeatureCollection',
        features: locations.map((location) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [location.loc_long, location.loc_lat],
          },
          properties: {
            loc_name: location.loc_name,
            loc_address: location.loc_address,
            loc_postcode: location.loc_postcode,
            loc_subdistrict: location.loc_subdistrict,
            loc_district: location.loc_district,
            loc_province: location.loc_province,
            createdBy: location.createdBy,
          },
        })),
      };

      return geojson;
    } catch (error) {
      throw new Error(`Failed to find locations: ${error.message}`);
    }
  }

  async getLists() {
    try {
      const locations = await this.prisma.location.findMany();

      const list = locations.map((location) => ({
        loc_id: location.loc_id,
        loc_name: location.loc_name,
      }));

      return list;
    } catch (error) {
      throw new Error(`Failed to find locations: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const location = await this.prisma.location.findUnique({
        where: { loc_id: id },
      });
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      return location;
    } catch (error) {
      throw new Error(`Failed to find location: ${error.message}`);
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const location = await this.prisma.location.findUnique({
        where: { loc_id: id },
      });
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      await this.prisma.location.update({
        where: { loc_id: id },
        data: updateLocationDto,
      });
      return `Location with id ${id} updated successfully`;
    } catch (error) {
      throw new Error(`Failed to update location: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const location = await this.prisma.location.findUnique({
        where: { loc_id: id },
      });
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      await this.prisma.location.delete({
        where: { loc_id: id },
      });
      return { message: `Location with id ${id} removed successfully` };
    } catch (error) {
      throw new Error(`Failed to remove location: ${error.message}`);
    }
  }
}
