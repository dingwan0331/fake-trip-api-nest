import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { AuthModule } from '../src/apps/auth/auth.module';
import { of } from 'rxjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../src/config/typeOrm.config';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/users/signup', async () => {
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

    jest
      .spyOn(HttpService.prototype, 'get')
      .mockImplementation(() => of(kakaoRes));

    const serviceToken = 'agagaggagag.agagapiguag';

    jest
      .spyOn(JwtService.prototype, 'sign')
      .mockImplementation(() => serviceToken);

    const kakaoAccessToken = 'agsdjgoiqr';

    const response = await request(app.getHttpServer())
      .post('/auth/users/signup')
      .set('authorization', kakaoAccessToken);

    expect(response.statusCode).toBe(200);
    expect(response.headers.authorization).toBe(serviceToken);
  });
});
