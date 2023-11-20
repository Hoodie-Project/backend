import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfileEntity } from '@src/user/entity/user-profile.entity';
import { AccountStatus } from '@src/user/types/user';
import { ApiProperty } from '@nestjs/swagger';

@Entity('account')
export class UserAccountEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  uid: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  refreshToken: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AccountStatus,
    enumName: 'AccountStatus',
    default: AccountStatus.ACTIVE,
  })
  status: AccountStatus;

  @ApiProperty()
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @ApiProperty()
  @OneToOne(() => UserProfileEntity, (profile) => profile.account)
  @JoinColumn()
  profile: UserProfileEntity;
}
