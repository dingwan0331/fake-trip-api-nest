import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Accommodation } from './entities/accommodation.entity';
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
