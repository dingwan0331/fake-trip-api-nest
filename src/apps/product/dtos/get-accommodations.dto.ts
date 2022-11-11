import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export enum OrderBy {
  '?' = '',
  'latest' = '',
  'max-price' = '',
  'min-price' = '',
}

export class GetAccommodationsDto {
  private nowDate = new Date();

  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  accommodationId: number;

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

  @Transform((data) => OrderBy[data.value])
  orderKey: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @IsInt()
  limit: number = 20;

  @IsString()
  @IsOptional()
  filter: string = '';
}
