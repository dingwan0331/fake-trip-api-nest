import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/accommodations')
  async getAccommodations() {
    return;
  }

  @Get('/accommodations/:id')
  async getAccommodation(@Param() id: string) {
    return this.productService.getAccommodation(id);
  }
}
