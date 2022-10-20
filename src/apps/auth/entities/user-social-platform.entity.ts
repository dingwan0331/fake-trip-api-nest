import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserPlatformTypeEnum {
  KAKAOTALK = 'kakao_talk',
  GOOGLE = 'google',
}

@Entity('user_social_platforms')
export class UserSocialPlatform extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column('enum', { enum: UserPlatformTypeEnum })
  type: UserPlatformTypeEnum;

  @Column('bigint', { unsigned: true })
  pk: number;
}
