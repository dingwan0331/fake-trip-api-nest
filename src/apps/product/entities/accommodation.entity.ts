import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
}
