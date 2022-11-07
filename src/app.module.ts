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
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_USERNAME: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_SYNC: Joi.number().default(0),
        JWT_EXPIRE_IN: Joi.number().required(),
        SECRET_KEY: Joi.string().required(),
        SERVER_PORT: Joi.string().default(8000),
      }),
    }),
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
