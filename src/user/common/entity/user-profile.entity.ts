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

  @Column({ type: 'varchar', length: 100 })
  nickname: string;

  @Column({ type: 'varchar' })
  image: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @OneToOne(() => UserAccountEntity, (account) => account.profile)
  account: UserAccountEntity;
}
