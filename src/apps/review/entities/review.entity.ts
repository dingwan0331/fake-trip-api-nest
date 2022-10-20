import { User } from 'src/apps/auth/entities/user.entity';
import { Room } from 'src/apps/product/entities/room.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewImage } from './review-image.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  content: string;

  @Column('tinyint', { unsigned: true, width: 3 })
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.review)
  reviewImage: ReviewImage[];

  @ManyToOne(() => Room, (room) => room.review)
  room: Room;

  @ManyToOne(() => User, (user) => user.review)
  user: User;
}
