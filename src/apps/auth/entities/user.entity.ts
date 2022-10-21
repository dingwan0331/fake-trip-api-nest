import { Booking } from 'src/apps/booking/entities/booking.entity';
import { Review } from 'src/apps/review/entities/review.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserSocialPlatform } from './user-social-platform.entity';

@Unique(['nickname', 'phoneNumber', 'email'])
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  credit: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToOne(
    () => UserSocialPlatform,
    (userSocialPlatform) => userSocialPlatform.user,
    { eager: true },
  )
  @JoinColumn()
  userSocialPlatform: UserSocialPlatform;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];
}
