import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { UserAccountEntity } from '../entity/user-account.entity';
import { KakaoTokenDto } from '../dto/kakao-token.dto';
import axios from 'axios';

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

  async insertAccountInfo(sub: string, refreshToken: string, email: string) {
    await this.userAccountRepository.save({
      uid: sub,
      refreshToken,
      email,
    });
  }

  async insertProfileInfo(
    nickname: string,
    picture: string,
    birthdate: string,
  ) {
    await this.userProfileRepository.save({
      nickname,
      image: picture,
      birthdate,
    });
  }

  async getUserByUID(sub: string) {
    const user = await this.userAccountRepository.findOne({
      where: { uid: sub },
    });
    return user;
  }
}
