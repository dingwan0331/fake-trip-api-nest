import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from './entities/accommodation.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
