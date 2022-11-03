import { Controller, Post } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Post('/reviews')
  async createReview() {
    return;
  }
}
