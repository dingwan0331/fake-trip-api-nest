import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity('review_images')
export class ReviewImage extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Review, (review) => review.reviewImage)
  review: Review;
}
