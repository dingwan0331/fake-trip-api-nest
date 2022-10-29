import { EntityRepository, Repository } from 'typeorm';
import { Accommodation } from './entities/accommodation.entity';

@EntityRepository(Accommodation)
export class AccommodationRepository extends Repository<Accommodation> {
  async getAccommodation(id: string): Promise<Accommodation> {
    const accommodationRow: Accommodation = await this.createQueryBuilder(
      'accommodation',
    )
      .select()
      .addSelect('room.price')
      .leftJoinAndSelect('accommodation.accommodationType', 'type')
      .leftJoinAndSelect('accommodation.accommodationRegion', 'region')
      .leftJoinAndSelect('accommodation.accommodationSubImage', 'subImage')
      .leftJoinAndSelect('accommodation.accommodationAmenity', 'amentiy')
      .leftJoin('accommodation.room', 'room')
      .orderBy({ price: 'ASC' })
      .limit(1)
      .where(id)
      .getOne();
    return accommodationRow;
    // .addSelect('room.price')
    // .addSelect(
    //   (sq) =>
    //     sq
    //       .select('price')
    //       .from('rooms', 'room')
    //       .orderBy({ price: 'DESC' })
    //       .limit(1),
    //   'price',
    // )
    // .leftJoinAndSelect(
    //   (sq) => {
    //     return sq
    //       .select(['accommodation_id', 'price'])
    //       .from('rooms', 'room')
    //       .orderBy({ price: 'ASC' })
    //       .limit(1);
    //   },
    //   'room',
    //   'room.accommodation_id = accommodation.id',
    // )
    // .leftJoinAndMapOne(
    //   'accommodation.room',
    //   (subQuery) => {
    //     return subQuery.select('*').from('rooms', 'room');
    //   },
    //   'room',
    //   'room.accommodation_id = accommodation.id',
    // )

    // await this.find({
    //   where: id,
    //   relations: [
    //     'accommodationType',
    //     'accommodationRegion',
    //     'accommodationSubImage',
    //     'accommodationAmenity',
    //   ],
    //   join: {
    //     alias: 'room',
    //     leftJoin: { room: 'a' },
    //   },
    // });

    // if (!accommodationRow) {
    //   return undefined;
    // }
    // return accommodationRow[0];
  }
}
