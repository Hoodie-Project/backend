import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserAccountEntity } from './user-account.entity';

@Entity('profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  nickname: string;

  @Column()
  image: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToOne(() => UserAccountEntity, (account) => account.profile)
  account: UserAccountEntity;
}
