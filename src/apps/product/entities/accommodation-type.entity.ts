import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Unique(['type'])
@Entity('accommodation_types')
export class AccommodationType extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  type: string;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.accommodationType,
  )
  accommodation: Accommodation[];
}
