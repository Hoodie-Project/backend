import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { UserAccountEntity } from '../entity/user-account.entity';
import { KakaoDto } from '../dto/kakao-token.dto';
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

  async kakaoSignIn(kakaoDto: KakaoDto) {
    try {
      const { id_token } = kakaoDto;
    } catch (error) {}
  }

  async getUserInfo(kakaoDto: KakaoDto) {
    const { access_token, id_token } = kakaoDto;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios({
        method: 'GET',
      });
    } catch (error) {}
  }
}
