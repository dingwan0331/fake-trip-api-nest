import { Transform, Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export enum getAccommodationsOrderConfig {
  'highest-price' = 'room.price DESC',
  'lowest-price' = 'room.price ASC',
}

export class GetAccommodationsDto {
  private nowDate = new Date();

  @IsOptional()
  @IsDateString()
  startDate: string = this.nowDate.toISOString();

  @IsOptional()
  @IsDateString()
  endDate: string = new Date(
    this.nowDate.setDate(this.nowDate.getDate() + 1),
  ).toISOString();

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  guests = 2;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  limit = 20;

  @IsOptional()
  @Transform((data) => getAccommodationsOrderConfig[data.value].split(' '))
  order: any[] = getAccommodationsOrderConfig['highest-price'].split(' ');
}
