import { HttpModule, HttpService } from '@nestjs/axios';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.serveice';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../../config/typeOrm.config';
import { User } from './entities/user.entity';
import { UserSocialPlatform } from './entities/user-social-platform.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        HttpModule,
        JwtModule,
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmModule.forFeature([User, UserSocialPlatform]),
      ],
      providers: [AuthService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('signUp', () => {
    it('Success', async () => {
      const kakaoRes: AxiosResponse<any> = {
        data: {
          id: 1231414,
          kakao_account: {
            profile: {
              nickname: 'a',
            },
            email: '123123@gmail.com',
          },
        },
        status: 200,
        statusText: 'ag',
        config: {},
        headers: {},
      };

      jest.spyOn(HttpService.prototype, 'get').mockReturnValue(of(kakaoRes));

      const serviceToken = 'agagaggagag.agagapiguag';

      jest.spyOn(JwtService.prototype, 'sign').mockReturnValue(serviceToken);

      const authorization = '';

      expect(await authService.signup(authorization)).toBeDefined();
      expect(await authService.signup(authorization)).toEqual({
        accessToken: serviceToken,
      });
    });
  });
});
