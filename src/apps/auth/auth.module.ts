import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.serveice';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE_IN, SECRET_KEY } from 'src/config';
import { User } from './entities/user.entity';
import { UserSocialPlatform } from './entities/user-social-platform.entity';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRE_IN },
    }),
    TypeOrmModule.forFeature([User, UserSocialPlatform]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
