import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CalendarEntity } from './calendar.entity';
import { PlanEntity } from './plan.entity';

@Entity('plan-revision')
export class PlanRevisionEntity {
  @ApiProperty({ type: 'bigint' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ type: 'varchar' })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ type: 'text' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  event_date: Date;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  revised_start_date: Date;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  revised_end_date: Date;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => PlanEntity, (plan) => plan.planRevision)
  plan: PlanEntity;

  @ApiProperty()
  @ManyToOne(() => CalendarEntity, (calendar) => calendar.planRevision)
  calendar: CalendarEntity;
}
