import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { UserAccountEntity } from '../entity/user-account.entity';

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
    return this.userAccountRepository.findOne({
      where: { uid },
      relations: {
        profile: true,
      },
    });
  }

  async updateUserInfoByUID(uid: string, nickname: string) {
    const user = await this.getUserByUID(uid);
    user.profile.nickname;
    await this.userProfileRepository.save({ nickname });
  }

  async deleteUserByUID(uid: string) {
    const user = await this.userAccountRepository.softDelete({ uid });
    await this.userProfileRepository.softDelete(uid);
  }
}
