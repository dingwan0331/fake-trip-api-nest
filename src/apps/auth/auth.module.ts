import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.serveice';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserSocialPlatform } from './entities/user-social-platform.entity';
import { JwtConfigService } from '../../config/jwt-module.config';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forFeature([User, UserSocialPlatform]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
