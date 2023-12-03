import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserProfileEntity } from '@src/user/entity/user-profile.entity';
import { AccountStatus } from '@src/types/user';
import { ApiProperty } from '@nestjs/swagger';
import { PlanEntity } from '@src/plan/entity/plan.entity';
import { CalendarEntity } from '@src/plan/entity/calendar.entity';

@Entity('account')
export class UserAccountEntity {
  @ApiProperty({ type: 'bigint' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ type: 'varchar' })
  @Column({ type: 'varchar', unique: true })
  uid: string;

  @ApiProperty({ type: 'varchar' })
  @Column({ type: 'varchar' })
  refreshToken: string;

  @ApiProperty({ type: 'varchar' })
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty({ type: 'enum' })
  @Column({
    type: 'enum',
    enum: AccountStatus,
    enumName: 'AccountStatus',
    default: AccountStatus.ACTIVE,
  })
  status: AccountStatus;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @ApiProperty()
  @OneToOne(() => UserProfileEntity, (profile) => profile.account)
  @JoinColumn()
  profile: UserProfileEntity;

  @ApiProperty()
  @OneToMany(() => PlanEntity, (plan) => plan.account, { lazy: true })
  plan: Promise<PlanEntity[]>;

  @ApiProperty()
  @OneToMany(() => CalendarEntity, (calendar) => calendar.account, {
    lazy: true,
  })
  calendar: Promise<CalendarEntity[]>;
}
