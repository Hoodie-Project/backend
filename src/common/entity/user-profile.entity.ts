import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserAccountEntity } from './user-account.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('profile')
export class UserProfileEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  nickname: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  image: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @OneToOne(() => UserAccountEntity, (account) => account.profile)
  account: UserAccountEntity;
}
