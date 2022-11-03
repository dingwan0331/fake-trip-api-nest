import { Controller, Post, Get, Param } from '@nestjs/common';

@Controller('booking')
export class BookingController {
  @Post('/reservations')
  async createBooking() {
    return;
  }

  @Get('/rooms/:id')
  async getRoom(@Param() id: string) {
    return;
  }
}
