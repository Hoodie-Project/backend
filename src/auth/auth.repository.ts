import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '@src/user/entity/user-profile.entity';
import { UserAccountEntity } from '@src/user/entity/user-account.entity';

@Injectable()
export class AuthRepository {
  private userProfileRepository: Repository<UserProfileEntity>;
  private userAccountRepository: Repository<UserAccountEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.userProfileRepository =
      this.dataSource.getRepository(UserProfileEntity);
    this.userAccountRepository =
      this.dataSource.getRepository(UserAccountEntity);
  }
  async getRefreshToken(uid: string) {
    const { refreshToken } = await this.userAccountRepository.findOne({
      where: { uid },
      select: ['refreshToken'],
    });
    return refreshToken;
  }
}
