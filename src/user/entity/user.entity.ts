import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserStatus } from '../types/user-status';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  uid: bigint;

  @Column()
  email: string;

  @Column()
  status: UserStatus;

  @CreateDateColumn()
  created_at;
}
