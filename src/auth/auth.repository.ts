import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '@src/common/entity/user-profile.entity';
import { UserAccountEntity } from '@src/common/entity/user-account.entity';
import { AccountStatus } from '@src/common/types/user';

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

  async getRefreshToken(uid: string): Promise<string> {
    const { refreshToken } = await this.userAccountRepository.findOne({
      where: { uid },
      select: ['refreshToken'],
    });

    return refreshToken;
  }

  async inactivateAccountStatus(uid: string): Promise<void> {
    await this.userAccountRepository.update(
      { uid: uid },
      { status: AccountStatus.INACTIVE },
    );
  }
}
