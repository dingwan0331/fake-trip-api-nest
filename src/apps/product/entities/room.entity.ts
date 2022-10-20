import { Booking } from 'src/apps/booking/entities/booking.entity';
import { Review } from 'src/apps/review/entities/review.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { RoomSubImage } from './room-sub-image.entity';

@Entity('rooms')
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column()
  mainImageUrl: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  description: string;

  @Column()
  quantity: number;

  @Column()
  minGuest: number;

  @Column()
  maxGuest: number;

  @OneToMany(() => RoomSubImage, (roomSubImage) => roomSubImage.room)
  roomSubImage: RoomSubImage[];

  @OneToMany(() => Booking, (booking) => booking.room)
  booking: Booking[];

  @OneToMany(() => Review, (review) => review.room)
  review: Review[];

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.room)
  accommodation: Accommodation;
}
