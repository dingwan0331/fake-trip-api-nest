import { Room } from 'src/apps/product/entities/room.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from './booking-status.entity';

@Entity('bookings')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  content: string;

  @Column('json')
  guestInformation: object;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => Room, (room) => room.booking)
  room: Room;

  @ManyToOne(() => BookingStatus, (bookingStatus) => bookingStatus.booking)
  bookingStatus: BookingStatus;
}
