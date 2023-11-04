import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { KakaoTokenDto } from './dto/kakao-token.dto';
import axios from 'axios';
import { AuthService } from 'src/auth/auth.service';

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
      console.log(error);
    }
  }

  async registerUser(accessToken: string, refreshToken: string) {
    const userInfo = await this.getKakaoUserInfo(accessToken);
    const { sub, nickname, picture, email } = userInfo;

    await this.userRepository.insertAccountInfo(sub, refreshToken, email);
    await this.userRepository.insertProfileInfo(nickname, picture);
  }
}
