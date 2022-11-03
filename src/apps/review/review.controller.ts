import { Controller, Param, Post, Put } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Post('/reviews')
  async createReview() {
    return;
  }

  @Put('/reviews/:id')
  async updateReview(@Param() id: string) {
    return;
  }
}
