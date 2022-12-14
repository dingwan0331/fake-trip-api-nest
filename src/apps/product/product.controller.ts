import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GetAccommodationsDto } from './dtos/get-accommodations.dto';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Accommodation } from './entities/accommodation.entity';
import { Room } from './entities/room.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/accommodations')
  async getAccommodations(@Query() getAccommodationsDto: GetAccommodationsDto) {
    return this.productService.getAccommodations(getAccommodationsDto);
  }

  @Get('/accommodations/:id')
  getAccommodation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Accommodation> {
    return this.productService.getAccommodation(id);
  }

  @Get('/rooms')
  getRooms(@Query() getRoomsDto: GetRoomsDto): Promise<Room[]> {
    return this.productService.getRooms(getRoomsDto);
  }

  @Get('/reviews')
  async getReviews(@Query() accommodationId: string) {
    return;
  }
}
