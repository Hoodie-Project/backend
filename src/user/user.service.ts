import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@src/user/repository/user.repository';
import { KakaoTokenDto } from '@src/user/dto/kakao-token.dto';
import { AuthService } from '@src/auth/auth.service';
import axios from 'axios';
import { AccountStatus } from './types/account-status';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * function: 카카오톡 OAUTH 로그인 로직
   * @param kakaoTokenDto: 카카오 토큰 객체
   */
  async kakaoSignIn(kakaoTokenDto: KakaoTokenDto) {
    const { accessToken, refreshToken, idToken } = kakaoTokenDto;

    await this.authService.validateKakaoIdToken(idToken);

    const userInfo = await this.getKakaoUserInfo(accessToken);
    const { sub } = userInfo;

    const user = await this.userRepository.getUserByUID(sub);

    if (user.uid !== sub) {
      this.registerUser(accessToken, refreshToken);
    }
    return { accessToken, refreshToken, idToken };
  }

  async kakaoSignOut(accessToken: string, uid: string) {
    if (!accessToken) {
      throw new BadRequestException('No accessToken provided');
    }

    const reqHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const reqBody = {
      target_id_type: 'user_id',
      target_id: uid,
    };

    try {
      const response = await axios({
        method: 'POST',
        url: process.env.KAKAO_SIGNOUT_URL,
        timeout: 30000,
        headers: reqHeaders,
        data: reqBody,
      });

      console.log('hello', response);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to sign out');
    }
  }

  /**
   * function: 사용자 정보 반환
   * @param accessToken
   * @returns 사용자 정보
   */
  async getKakaoUserInfo(accessToken: string) {
    if (!accessToken) {
      throw new BadRequestException('No accessToken provided');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get(process.env.KAKAO_USERINFO_URL, config);
      const { sub, nickname, picture, email } = response.data;
      return { sub, nickname, picture, email };
    } catch (error) {
      throw new BadRequestException('Failed to get user information');
    }
  }

  async registerUser(accessToken: string, refreshToken: string) {
    const userInfo = await this.getKakaoUserInfo(accessToken);
    const { sub, nickname, picture, email } = userInfo;

    const userProfileEntity = await this.userRepository.insertProfileInfo(
      nickname,
      picture,
    );

    await this.userRepository.insertAccountInfo(
      sub,
      refreshToken,
      email,
      userProfileEntity,
    );
  }

  async updateUser(uid: string, nickname: string) {
    const { status, profile } = await this.userRepository.getUserByUID(uid);
    const id = profile.id as number;

    if (status === AccountStatus.ACTIVE) {
      await this.userRepository.updateUserInfoByUID(id, nickname);
    }
  }

  async deleteUser(uid: string) {
    const user = await this.userRepository.getUserByUID(uid);
    const existedUID = user.uid;

    if (uid === existedUID) {
      await this.userRepository.deleteUserByUID(uid);
    }
  }

  // async createUser(testDto: TestDto) {
  //   const { uid, refreshToken, email, nickname, image } = testDto;

  //   const userProfileEntity = await this.userRepository.insertProfileInfo(
  //     nickname,
  //     image,
  //   );

  //   await this.userRepository.insertAccountInfo(
  //     uid,
  //     refreshToken,
  //     email,
  //     userProfileEntity,
  //   );
  // }

  async getUserInfo(uid: string) {
    return await this.userRepository.getUserByUID(uid);
  }
}
