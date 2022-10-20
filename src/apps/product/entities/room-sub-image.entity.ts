import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('room_sub_images')
export class RoomSubImage extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Room, (room) => room.roomSubImage)
  room: Room;
}
