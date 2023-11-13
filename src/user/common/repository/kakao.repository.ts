import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '@src/user/common/entity/user-profile.entity';
import { UserAccountEntity } from '@src/user/common/entity/user-account.entity';
import { AccountStatus } from '@src/user/kakao/types/account-status';

@Injectable()
export class KakaoUserRepository {
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
  ) {
    await this.userAccountRepository.save({
      uid: sub,
      refreshToken,
      email,
      profile,
    });
  }

  async insertProfileInfo(nickname: string, image: string) {
    return this.userProfileRepository.save({
      nickname,
      image,
    });
  }

  async getUserByUID(uid: string) {
    return await this.userAccountRepository.findOne({ where: { uid } });
  }

  async getUserInfoByUID(uid: string) {
    return await this.userAccountRepository.findOne({
      where: { uid },
      relations: {
        profile: true,
      },
    });
  }

  async updateUserInfoByUID(id: number, nickname: string) {
    await this.userProfileRepository.update(id, { nickname });
  }

  async deleteUserByUID(uid: string) {
    await this.userAccountRepository.update(
      { uid: uid },
      {
        status: AccountStatus.INACTIVE,
      },
    );
  }
}
