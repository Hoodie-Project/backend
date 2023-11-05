import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { AccountStatus } from '../types/account-status';

@Entity('account')
export class UserAccountEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  uid: string;

  @Column()
  refreshToken: string;

  @Column()
  email: string;

  @Column({ default: AccountStatus.ACTIVE })
  status: AccountStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserProfileEntity, (profile) => profile.account)
  @JoinColumn()
  profile: UserProfileEntity;
}
