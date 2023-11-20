import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '@src/user/entity/user-profile.entity';
import { UserAccountEntity } from '@src/user/entity/user-account.entity';
import { AccountStatus } from '@src/user/types/user';
@Injectable()
export class UserRepository {
  private userProfileRepository: Repository<UserProfileEntity>;
  private userAccountRepository: Repository<UserAccountEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.userProfileRepository =
      this.dataSource.getRepository(UserProfileEntity);
    this.userAccountRepository =
      this.dataSource.getRepository(UserAccountEntity);
  }

  async insertAccountInfo(
    sub: string,
    refreshToken: string,
    email: string,
    profile: UserProfileEntity,
  ): Promise<void> {
    await this.userAccountRepository.save({
      uid: sub,
      refreshToken,
      email,
      profile,
    });
  }

  async insertProfileInfo(
    nickname: string,
    image: string,
  ): Promise<UserProfileEntity> {
    return await this.userProfileRepository.save({
      nickname,
      image,
    });
  }

  async getUserByUID(uid: string): Promise<UserAccountEntity> {
    return await this.userAccountRepository.findOne({
      where: { uid },
      select: ['uid'],
    });
  }

  async getUserInfoByUID(uid: string): Promise<UserAccountEntity> {
    return await this.userAccountRepository.findOne({
      where: { uid },
      relations: {
        profile: true,
      },
    });
  }

  async updateUserInfoByUID(id: number, nickname: string): Promise<void> {
    await this.userProfileRepository.update(id, { nickname });
  }

  async deleteUserByUID(uid: string): Promise<void> {
    await this.userAccountRepository.update(
      { uid: uid },
      { status: AccountStatus.INACTIVE },
    );
  }

  async activateAccountStatus(uid: string): Promise<void> {
    await this.userAccountRepository.update(
      { uid: uid },
      { status: AccountStatus.ACTIVE },
    );
  }
}
