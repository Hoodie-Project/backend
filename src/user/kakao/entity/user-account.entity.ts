import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfileEntity } from '@src/user/kakao/entity/user-profile.entity';
import { AccountStatus } from '@src/user/kakao/types/account-status';

@Entity('account')
export class UserAccountEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  uid: string;

  @Column()
  refreshToken: string;

  @Column()
  email: string;

  @Column({ default: AccountStatus.ACTIVE })
  status: AccountStatus;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToOne(() => UserProfileEntity, (profile) => profile.account)
  @JoinColumn()
  profile: UserProfileEntity;
}
