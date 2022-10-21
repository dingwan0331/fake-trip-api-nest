import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity('accommodation_types')
export class AccommodationType extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true })
  type: string;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.accommodationType,
  )
  accommodation: Accommodation[];
}
