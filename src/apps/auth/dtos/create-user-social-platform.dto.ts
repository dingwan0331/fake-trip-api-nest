import { UserPlatformTypeEnum } from '../entities/user-social-platform.entity';

export class CreateSocialPlatformDto {
  pk: number;

  type: UserPlatformTypeEnum.KAKAOTALK;
}
