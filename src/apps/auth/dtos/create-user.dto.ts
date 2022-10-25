import { UserSocialPlatform } from '../entities/user-social-platform.entity';

export class CreateUserDto {
  nickname: string;

  email: string;

  userSocialPlatform: UserSocialPlatform;
}
