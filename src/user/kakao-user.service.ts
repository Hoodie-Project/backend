import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@src/user/repository/user.repository';
import { KakaoTokenDto } from '@src/user/dto/kakao-token.dto';
import { AuthService } from '@src/auth/auth.service';
import axios from 'axios';
import { AccountStatus } from './types/account-status';

@Injectable()
export class KakaoUserService {
  constructor(
    private readonly authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  /**
   * function: 카카오톡 OAUTH 메인 로그인
   * @param kakaoTokenDto 카카오 요청 토큰 객체
   * @returns accessToken, refreshToken, idToken
   */
  async kakaoSignIn(kakaoTokenDto: KakaoTokenDto) {
    const { accessToken, refreshToken, idToken } = kakaoTokenDto;

    await this.authService.validateKakaoIdToken(idToken);

    const { sub } = await this.getKakaoUserInfo(accessToken);
    const { uid } = await this.userRepository.getUserByUID(sub);

    // 회원 가입 처리
    if (uid !== sub) {
      this.registerUser(accessToken, refreshToken);
    }

    // 로그인 처리
    return { accessToken, refreshToken, idToken };
  }

  /**
   * function: 카카오 로그아웃
   * @param accessToken
   * @param uid 회원 번호
   * @returns 응답 코드, 로그아웃된 회원 번호
   */
  async kakaoSignOut(accessToken: string, uid: string) {
    if (!accessToken) {
      throw new BadRequestException('No accessToken provided');
    }

    const reqHeaders = {
      Authorization: `Bearer ${accessToken}`,
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
