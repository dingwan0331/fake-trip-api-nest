import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity('accommodation_regions')
export class AccommodationRegion extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true })
  region: string;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.accommodationRegion,
  )
  accommodation: Accommodation[];
}
