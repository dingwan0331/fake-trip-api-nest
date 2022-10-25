import { UserPlatformTypeEnum } from '../entities/user-social-platform.entity';

export class FindUserDto {
  pk: number;

  type: UserPlatformTypeEnum.KAKAOTALK;
}
