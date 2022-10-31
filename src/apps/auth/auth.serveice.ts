import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import {
  UserPlatformTypeEnum,
  UserSocialPlatform,
} from './entities/user-social-platform.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Url } from 'url';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface KakaoSocialResponse {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: Url;
    thumbnail_image: Url;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: Url;
      profile_image_url: Url;
      is_default_image: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserSocialPlatform)
    private readonly socialPlatformRepository: Repository<UserSocialPlatform>,
    private readonly dataSource: DataSource,
  ) {}
  async signup(authorization: string): Promise<{ accessToken: string }> {
    try {
      const KAKAO_SOCIAL_URL = 'https://kapi.kakao.com/v2/user/me';
      const headers = { authorization: `Bearer ${authorization}` };

      const { data: kakaoUserRes } = (await this.httpService
        .get(KAKAO_SOCIAL_URL, {
          headers,
        })
        .toPromise()) as AxiosResponse<KakaoSocialResponse>;

      const {
        id: pk,
        kakao_account: {
          email,
          profile: { nickname },
        },
      } = kakaoUserRes;

      const { KAKAOTALK: type } = UserPlatformTypeEnum;

      // 회원 정보 조회
      let userRow: undefined | User = await this.userRepository
        .createQueryBuilder('user')
        .select()
        .leftJoinAndSelect('user.userSocialPlatform', 'userSocialPlatform')
        .where(
          'userSocialPlatform.pk =:pk and userSocialPlatform.type = :type',
          {
            pk,
            type,
          },
        )
        .getOne();

      if (!userRow) {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
          await queryRunner.connect();
          await queryRunner.startTransaction();

          const createdSocialPlatform = this.socialPlatformRepository.create({
            pk,
            type,
          });

          userRow = this.userRepository.create({
            email,
            nickname,
            userSocialPlatform: createdSocialPlatform,
          });

          await queryRunner.manager.save(createdSocialPlatform);
          await queryRunner.manager.save(userRow);

          await queryRunner.commitTransaction();
        } catch (err) {
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
      }

      const { id } = userRow;
      const payload = { id };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    } catch (err) {
      if (err.name === 'AxiosError' && err.response.status === 401) {
        throw new UnauthorizedException();
      }
      console.error(err);
    }
  }
}
