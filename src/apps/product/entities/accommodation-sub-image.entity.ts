import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Unique(['url'])
@Entity('accommodation_sub_images')
export class AccommodationSubImage extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  url: string;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.accommodationSubImage,
  )
  accommodation: Accommodation;
}
