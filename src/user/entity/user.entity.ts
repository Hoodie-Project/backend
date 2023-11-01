import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../types/user-status';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  uid: number;

  @Column()
  email: string;

  @Column()
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
