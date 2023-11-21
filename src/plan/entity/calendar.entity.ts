import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CalendarEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ default: true })
  @Column({ default: true })
  is_default: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
}
