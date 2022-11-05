import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Room } from './entities/room.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/accommodations')
  async getAccommodations() {
    return;
  }

  @Get('/accommodations/:id')
  async getAccommodation(@Param() id: string) {
    return this.productService.getAccommodation(id);
  }

  @Get('/rooms')
  async getRooms(@Query() getRoomsDto: GetRoomsDto): Promise<Room[]> {
    return this.productService.getRooms(getRoomsDto);
  }

  @Get('/reviews')
  async getReviews(@Query() accommodationId: string) {
    return;
  }
}
