import { Controller, Post } from '@nestjs/common';

@Controller('booking')
export class BookingController {
  @Post('/reservations')
  async createBooking() {
    return;
  }
}
