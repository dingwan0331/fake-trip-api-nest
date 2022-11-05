import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from './entities/accommodation.entity';
import { Room } from './entities/room.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation, Room])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
