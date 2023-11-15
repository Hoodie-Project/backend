import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@src/user/common/repository/user.repository';
import { KakaoTokenDto } from '@src/user/kakao/dto/kakao-token.dto';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
import axios from 'axios';
import { AccountStatus } from './types/account-status';

@Injectable()
export class KakaoUserService {
  constructor(
    private readonly kakaoAuthService: KakaoAuthService,
    private userRepository: UserRepository,
  ) {}

  /**
   * function: 카카오톡 OAUTH 메인 로그인
   * @param kakaoTokenDto 카카오 요청 토큰 객체
   * @returns accessToken, refreshToken, idToken
   */
  async kakaoSignIn(kakaoTokenDto: KakaoTokenDto) {
    const { access_token, refresh_token, id_token } = kakaoTokenDto;

    await this.kakaoAuthService.validateKakaoIdToken(id_token);

    const { sub } = await this.getKakaoUserInfo(access_token);
    const user = await this.userRepository.getUserByUID(sub);

    console.log(user);
    console.log(sub);

    // 회원 가입 처리
    if (user === null) {
      this.registerUser(access_token, refresh_token);
    }

    // 로그인 처리
    return { access_token, refresh_token, id_token };
  }

  /**
   * function: 카카오 로그아웃
   * @param accessToken
   * @param uid 회원 번호
   * @returns 응답 코드, 로그아웃된 회원 번호
   */
  async kakaoSignOut(access_token: string, uid: string) {
    if (!access_token) {
      throw new BadRequestException('No accessToken provided');
    }

    const reqHeaders = {
      Authorization: `Bearer ${access_token}`,
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

      const { id } = response.data;

      console.log('hello', response);
      return id;
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
      throw new UnauthorizedException('Failed to get user information');
    }
  }

  /**
   * function: 유저 정보 입력 (회원가입)
   * @param accessToken
   * @param refreshToken
   */
  async registerUser(access_token: string, refresh_token: string) {
    const userInfo = await this.getKakaoUserInfo(access_token);
    const { sub, nickname, picture, email } = userInfo;

    const userProfileEntity = await this.userRepository.insertProfileInfo(
      nickname,
      picture,
    );

    await this.userRepository.insertAccountInfo(
      sub,
      refresh_token,
      email,
      userProfileEntity,
    );
  }

  async updateUser(uid: string, nickname: string) {
    const { status, profile } = await this.userRepository.getUserInfoByUID(uid);
    const id = profile.id as number;

    if (status !== AccountStatus.ACTIVE) {
      throw new UnauthorizedException(`This user is ${status}`);
    }
    await this.userRepository.updateUserInfoByUID(id, nickname);
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
    return await this.userRepository.getUserInfoByUID(uid);
  }
}
