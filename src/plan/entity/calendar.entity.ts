import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PlanEntity } from './plan.entity';
import { PlanRevisionEntity } from './plan-revision.entity';

@Entity()
export class CalendarEntity {
  @ApiProperty({ type: 'bigint' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ type: 'varchar' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ default: true })
  @Column({ default: true })
  is_default: boolean;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @ApiProperty({ type: PlanEntity })
  @OneToMany(() => PlanEntity, (plan) => plan.calendar)
  plan: PlanEntity[];

  @ApiProperty()
  @OneToMany(() => PlanRevisionEntity, (planRevision) => planRevision.calendar)
  planRevision: PlanRevisionEntity[];
}
