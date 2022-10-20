import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Unique(['region'])
@Entity('accommodation_regions')
export class AccommodationRegion extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  region: string;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.accommodationRegion,
  )
  accommodation: Accommodation[];
}
