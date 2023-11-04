import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  nickname: string;

  @Column()
  image: string;

  @Column()
  birthDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
