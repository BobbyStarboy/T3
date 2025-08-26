import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsString() @IsNotEmpty() loc_name: string;
  @IsString() @IsNotEmpty() loc_lat: string;
  @IsString() @IsNotEmpty() loc_long: string;
  @IsString() @IsNotEmpty() loc_address: string;
  @IsString() @IsNotEmpty() loc_tel_num: string;
  @IsString() @IsNotEmpty() loc_province: string;
}
