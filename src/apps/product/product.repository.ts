import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
