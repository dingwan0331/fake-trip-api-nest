import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAccommodationsDto } from './dtos/get-accommodations.dto';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { Accommodation } from './entities/accommodation.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getRooms(getRoomsDto: GetRoomsDto): Promise<Room[]> {
    const { accommodationId, startDate, endDate, guests } = getRoomsDto;
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
        'r.accommodation_id = :accommodationId AND r.quantity - IFNULL(b.booking_count,0) != 0 AND r.max_guest > :guests',
        {
          accommodationId,
          guests,
        },
      )
      .getMany();

    return roomsRow;
  }

  async getAccommodation(id: number) {
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
      .where({ id })
      .getOne();

    return accommodationRow;
  }

  async getAccommodations(
    getAccommodationsDto: GetAccommodationsDto,
  ): Promise<any[]> {
    const { startDate, endDate, guests, offset, limit, order } =
      getAccommodationsDto;

    const accommodationsRow = await this.accommodationRepository
      .createQueryBuilder('a')
      .select()
      .addSelect('room.price', 'room_price')
      .leftJoinAndSelect('a.accommodationType', 'type')
      .leftJoinAndSelect('a.accommodationRegion', 'region')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('Min(r.price) AS price, r.accommodation_id')
            .from('rooms', 'r')
            .leftJoin(
              (subQuery) => {
                return subQuery
                  .select('b.room_id, Count(*) AS booking_count')
                  .from('bookings', 'b')
                  .where(
                    'b.start_date < :endDate AND b.end_date > :startDate',
                    { startDate, endDate },
                  )
                  .groupBy('b.room_id');
              },
              'b',
              'r.id = b.room_id',
            )
            .where(
              '(r.quantity - IFNULL(b.booking_count,0)) > 0 AND r.max_guest >= :guests',
              { guests },
            )
            .groupBy('r.accommodation_id');
        },
        'room',
        'a.id = room.accommodation_id',
      )
      .where('room.price IS NOT NULL')
      .offset(offset)
      .limit(limit)
      .orderBy(order[0], order[1])
      .getRawMany();

    return accommodationsRow;
  }
}
