import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccommodationAmenity } from './accommodation-amenities.entity';
import { AccommodationRegion } from './accommodation-region.entity';
import { AccommodationSubImage } from './accommodation-sub-image.entity';
import { AccommodationType } from './accommodation-type.entity';
import { Room } from './room.entity';

@Entity('accommodations')
export class Accommodation extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  grade: number;

  @Column()
  address: string;

  @Column('text')
  description: string;

  @Column()
  mainImageUrl: string;

  @Column()
  thumnail: string;

  @Column('decimal', { precision: 13, scale: 10 })
  longtitude: number;

  @Column('decimal', { precision: 13, scale: 10 })
  latitude: number;

  @Column('time')
  checkIn: Date;

  @Column('time')
  checkOut: Date;

  @OneToMany(
    () => AccommodationSubImage,
    (accommodationSubImage) => accommodationSubImage.accommodation,
  )
  accommodationSubImage: AccommodationSubImage[];

  @OneToMany(() => Room, (room) => room.accommodation)
  room: Room[];

  @ManyToOne(
    () => AccommodationRegion,
    (accommodationRegion) => accommodationRegion.accommodation,
  )
  accommodationRegion: AccommodationRegion;

  @ManyToOne(
    () => AccommodationType,
    (accommodationType) => accommodationType.accommodation,
  )
  accommodationType: AccommodationType;

  @ManyToMany(() => AccommodationAmenity)
  @JoinTable({ name: 'accommadation_and_accommandation_amenity' })
  accommodationAmenity: AccommodationAmenity[];
}
