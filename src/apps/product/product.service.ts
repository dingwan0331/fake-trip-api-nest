import { Injectable } from '@nestjs/common';
import { GetAccommodationsDto } from './dtos/get-accommodations.dto';
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

  async getAccommodations(
    getAccommodationsDto: GetAccommodationsDto,
  ): Promise<any[]> {
    const accommodationRow = await this.productRepository.getAccommodations(
      getAccommodationsDto,
    );

    const accommodations = accommodationRow.map((row) => {
      return {
        id: row.a_id,
        name: row.a_name,
        grade: row.a_grade,
        address: row.a_address,
        description: row.a_description,
        main_image_url: row.a_main_image_url,
        thumnail: row.a_thumnail,
        longtitude: row.a_longtitude,
        latitude: row.a_latitude,
        check_in: row.a_check_in,
        check_out: row.a_check_out,
        type: { id: row.type_id, type: row.type_type },
        region: { id: row.region_id, region: row.region_region },
        price: '280000.00',
      };
    });
    return accommodations;
  }
}
