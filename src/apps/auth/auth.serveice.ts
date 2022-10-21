import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { UserRepository } from './user.repository';
import { UserPlatformTypeEnum } from './entities/user-social-platform.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Url } from 'url';

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
    private readonly userRepository: UserRepository,
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
        kakao_account: { email },
      } = kakaoUserRes;

      let userRow: undefined | User = await this.userRepository.findOne({
        email,
      });

      if (!userRow) {
        const {
          id: pk,
          kakao_account: {
            profile: { nickname },
          },
        } = kakaoUserRes;

        const newUser = this.userRepository.create({
          email,
          nickname,
          userSocialPlatform: { type: UserPlatformTypeEnum.KAKAOTALK, pk },
        });

        userRow = (await this.userRepository.save(newUser)) as User;
      }

      const { id } = userRow;

      const payload = { id };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    } catch (err) {
      if (err.name === 'AxiosError') {
        throw new UnauthorizedException();
      }
    }
  }
}
