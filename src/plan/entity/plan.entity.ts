import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PlanEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty()
  @Column()
  start_date: Date;

  @ApiProperty()
  @Column()
  end_date: Date;

  @ApiProperty()
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
}
