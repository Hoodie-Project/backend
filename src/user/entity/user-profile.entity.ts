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
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  nickname: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserAccountEntity, (account) => account.profile)
  account: UserAccountEntity;
}
