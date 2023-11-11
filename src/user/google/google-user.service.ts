import { Injectable } from '@nestjs/common';
import { GoogleTokenDto } from './dto/google-token.dto';
import { KakaoUserRepository } from '../kakao/repository/kakao.repository';
import { KakaoUserService } from '../kakao/kakao-user.service';
import { GoogleUserAccountInfo } from './types/google-token';

@Injectable()
export class GoogleUserService {
  constructor(
    private readonly kakaoUserRepository: KakaoUserRepository,
    private readonly kakaoUserService: KakaoUserService,
  ) {}

  async googleSignIn(googleTokenDto: GoogleTokenDto) {
    const { accessToken, refreshToken, idToken } = googleTokenDto;
    const [payload]: string[] = idToken.split('.');

    // idToken 유효성 검증

    // sub 비교

    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const { sub, email, email_verified, profile } = JSON.parse(decodedPayload);

    const { uid } = await this.kakaoUserRepository.getUserByUID(sub);

    // 회원 가입 처리
    if (sub !== uid) {
      await this.registerUser(email, email_verified, profile);
    }

    // 로그인 처리
    return { accessToken, refreshToken, idToken };
  }

  async registerUser(email: string, email_verified: boolean, profile: object) {}
}
