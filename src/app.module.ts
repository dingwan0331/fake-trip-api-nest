import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeOrm.config';
import { AuthModule } from './apps/auth/auth.module';
import { ProductModule } from './apps/product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
