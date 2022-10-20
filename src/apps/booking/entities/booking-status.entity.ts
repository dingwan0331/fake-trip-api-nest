import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum BookingStatusEnum {
  예약신청 = '예약 신청',
  결제대기 = '결제 대기',
  결제확인 = '결제 확인',
  예약완료 = '예약 완료',
  취소요청 = '취소 요청',
  취소완료 = '취소 완료',
  환불완료 = '환불 완료',
}

@Entity('booking_statuses')
export class BookingStatus extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column('enum', { enum: BookingStatusEnum })
  status: BookingStatusEnum;
}
