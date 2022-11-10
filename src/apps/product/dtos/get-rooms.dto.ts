import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class GetRoomsDto {
  private date = new Date();

  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  accommodationId: number;

  @IsOptional()
  @IsDateString()
  startDate: string = this.date.toISOString();

  @IsOptional()
  @IsDateString()
  endDate: string = new Date(this.date.getDate() + 1).toISOString();

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  guests = 2;
}
