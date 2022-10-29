import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationRepository } from './accommodation.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
