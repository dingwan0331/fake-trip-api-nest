import { Injectable } from '@nestjs/common';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Accommodation } from './entities/accommodation.entity';
import { Room } from './entities/room.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async getAccommodation(id: number): Promise<Accommodation> {
    const accommodationRow = await this.productRepository.getAccommodation(id);

    accommodationRow['price'] = accommodationRow.room[0].price;
    delete accommodationRow.room;

    return accommodationRow;
  }

  async getRooms(getRoomsDto: GetRoomsDto): Promise<Room[]> {
    const roomsRow: Room[] = await this.productRepository.getRooms(getRoomsDto);

    return roomsRow;
  }
}
