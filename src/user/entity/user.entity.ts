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
  uid: bigint;

  @Column()
  email: string;

  @Column()
  status: UserStatus;

  @CreateDateColumn()
<<<<<<< Updated upstream
  created_at;
=======
>>>>>>> Stashed changes
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
