import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeOrm.config';
import { AuthModule } from './apps/auth/auth.module';
import { ProductModule } from './apps/product/product.module';
import { ReviewModule } from './apps/review/review.module';
import { BookingModule } from './apps/booking/booking.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ProductModule,
    ReviewModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
