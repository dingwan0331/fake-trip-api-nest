import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['nickname', 'phoneNumber'])
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  credit: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
