import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Accommodation } from './entities/accommodation.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  async getAccommodation(id: string) {
    const accommodationRow: Accommodation = await this.accommodationRepository
      .createQueryBuilder('accommodation')
      .select()
      .addSelect('room.price')
      .leftJoinAndSelect('accommodation.accommodationType', 'type')
      .leftJoinAndSelect('accommodation.accommodationRegion', 'region')
      .leftJoinAndSelect('accommodation.accommodationSubImage', 'subImage')
      .leftJoinAndSelect('accommodation.accommodationAmenity', 'amentiy')
      .leftJoin('accommodation.room', 'room')
      .orderBy({ price: 'ASC' })
      .where(id)
      .getOne();

    accommodationRow['price'] = accommodationRow.room[0].price;
    delete accommodationRow.room;
    return accommodationRow;
  }

  async getRooms(getRoomsDto: GetRoomsDto): Promise<Room[]> {
    const {
      'accommodation-id': accommodationId = 1,
      'start-date': startDate = new Date(),
      'end-date': endDate = new Date(),
      guest = 2,
    } = getRoomsDto;

    const roomsRow: Room[] = await this.roomRepository
      .createQueryBuilder('r')
      .select()
      .leftJoinAndSelect('r.roomSubImage', 'subImage')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('b.room_id, Count(*) AS booking_count')
            .from('bookings', 'b')
            .leftJoin('b.room', 'r')
            .where(
              'r.accommodation_id = :accommodationId AND b.start_date < :endDate AND b.end_date > :startDate',
              { accommodationId, startDate, endDate },
            )
            .groupBy('b.room_id');
        },
        'b',
        'b.room_id = r.id',
      )
      .where(
        'r.accommodation_id = :accommodationId AND r.quantity - IFNULL(b.booking_count,0) != 0 AND r.max_guest > :guest',
        {
          accommodationId,
          guest,
        },
      )
      .getMany();

    return roomsRow;
  }
}
