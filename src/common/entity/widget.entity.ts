import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SideBarWidget } from '../types/plan';

@Entity('widget')
export class WidgetEntity {
  @ApiProperty({ type: 'bigint' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column()
  sideBar: SideBarWidget;

  @ApiProperty()
  @Column({ type: 'varchar', array: true })
  component: Array<string>;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
}
