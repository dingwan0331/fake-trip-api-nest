import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class GetRoomsDto {
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
  @IsPositive()
  @Type(() => Number)
  guests = 2;
}
