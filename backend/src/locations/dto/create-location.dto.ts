export class CreateLocationDto {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  address?: string;
  provice?: string;
  district?: string;
  subDistrict?: string;
  postalCode?: string;
}
