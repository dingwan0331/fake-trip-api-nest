import { Injectable } from '@nestjs/common';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Room } from './entities/room.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  // async getAccommodation(id: string) {
  //   const accommodationRow: Accommodation = await this.accommodationRepository
  //     .createQueryBuilder('accommodation')
  //     .select()
  //     .addSelect('room.price')
  //     .leftJoinAndSelect('accommodation.accommodationType', 'type')
  //     .leftJoinAndSelect('accommodation.accommodationRegion', 'region')
  //     .leftJoinAndSelect('accommodation.accommodationSubImage', 'subImage')
  //     .leftJoinAndSelect('accommodation.accommodationAmenity', 'amentiy')
  //     .leftJoin('accommodation.room', 'room')
  //     .orderBy({ price: 'ASC' })
  //     .where(id)
  //     .getOne();

  //   accommodationRow['price'] = accommodationRow.room[0].price;
  //   delete accommodationRow.room;
  //   return accommodationRow;
  // }

  async getRooms(getRoomsDto: GetRoomsDto): Promise<Room[]> {
    const roomsRow: Room[] = await this.productRepository.getRooms(getRoomsDto);

    return roomsRow;
  }
}
