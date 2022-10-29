import { Injectable } from '@nestjs/common';
import { AccommodationRepository } from './accommodation.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly accommodationRepository: AccommodationRepository,
  ) {}
  async getAccommodation(id: string) {
    const accommodationRow =
      await this.accommodationRepository.getAccommodation(id);

    const result = Object.assign({ isSoldOut: false }, accommodationRow);
    result['price'] = result.room[0].price;
    delete result.room;
    return result;
  }
}
