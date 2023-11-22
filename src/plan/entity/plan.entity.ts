import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CalendarEntity } from './calendar.entity';
import { UserAccountEntity } from '@src/user/entity/user-account.entity';
import { RecurrenceEntity } from './recurrence.entity';
import { PlanRevisionEntity } from './plan-revision.entity';

@Entity()
export class PlanEntity {
  @ApiProperty({ type: 'bigint' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  start_date: Date;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  end_date: Date;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => CalendarEntity, (calendar) => calendar.plan)
  calendar: CalendarEntity[];

  @ApiProperty()
  @ManyToOne(() => UserAccountEntity, (user) => user.plan)
  user: UserAccountEntity[];

  @ApiProperty()
  @OneToMany(() => RecurrenceEntity, (recurrence) => recurrence.plan)
  recurrence: RecurrenceEntity[];

  @ApiProperty()
  @OneToMany(() => PlanRevisionEntity, (planRevision) => planRevision.plan)
  planRevision: PlanRevisionEntity[];
}
