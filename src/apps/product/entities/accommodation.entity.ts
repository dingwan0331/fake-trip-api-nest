import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AccommodationRegion } from './accommodation-region.entity';
import { AccommodationSubImage } from './accommodation-sub-image.entity';
import { AccommodationType } from './accommodation-type.entity';

@Unique(['name'])
@Entity('accommodations')
export class Accommodation extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
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

  @Column('decimal', { precision: 13, scale: 2 })
  longtitude: number;

  @Column('decimal', { precision: 13, scale: 2 })
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
}
