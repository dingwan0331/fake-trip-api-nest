import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accommodation } from './entities/accommodation.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
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
}
