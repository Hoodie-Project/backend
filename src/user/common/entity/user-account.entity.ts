import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfileEntity } from '@src/user/common/entity/user-profile.entity';
import { AccountStatus } from '@src/user/kakao/types/account-status';

@Entity('account')
export class UserAccountEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  uid: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    enumName: 'AccountStatus',
    default: AccountStatus.ACTIVE,
  })
  status: AccountStatus;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @OneToOne(() => UserProfileEntity, (profile) => profile.account)
  @JoinColumn()
  profile: UserProfileEntity;
}
