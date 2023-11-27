import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CycleRecurrence, DayRecurrence } from '../types/plan';
import { PlanEntity } from './plan.entity';

@Entity('recurrence')
export class RecurrenceEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ type: 'enum' })
  @Column({ type: 'enum', enum: CycleRecurrence, enumName: 'cycleRecurrence' })
  cycle: CycleRecurrence;

  @ApiProperty()
  @Column({ type: 'int' })
  frequency: number;

  @ApiProperty({ type: 'enum' })
  @Column({ type: 'enum', enum: DayRecurrence, enumName: 'dayRecurrence' })
  day: DayRecurrence;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  endDate: Date;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => PlanEntity, (plan) => plan.recurrence)
  plan: PlanEntity;
}
