import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateLocationDto {
  loc_name: string;
  loc_lat: GLfloat;
  loc_long: GLfloat;
  loc_address?: string;
  loc_postcode?: string;
  loc_subdistrict?: string;
  loc_district?: string;
  loc_province?: string;
  loc_geojson?: object;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
