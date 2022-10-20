import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

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

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.room)
  accommodation: Accommodation;
}
