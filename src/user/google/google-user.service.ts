import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleTokenDto } from './dto/google-token.dto';
import { KakaoUserRepository } from '../common/repository/kakao.repository';
import { KakaoUserService } from '../kakao/kakao-user.service';
import { GoogleAuthService } from '@src/auth/google/google-auth.service';

@Injectable()
export class GoogleUserService {
  constructor(
    private readonly kakaoUserRepository: KakaoUserRepository,
    private readonly kakaoUserService: KakaoUserService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  async googleSignIn(googleTokenDto: GoogleTokenDto) {
    const { accessToken, refreshToken, idToken } = googleTokenDto;
    const [payload]: string[] = idToken.split('.');

    // idToken 유효성 검증
    await this.googleAuthService.validateGoogleIdToken(payload);

    // sub 비교
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const { sub, email, email_verified, profile } = JSON.parse(decodedPayload);

    const { uid } = await this.kakaoUserRepository.getUserByUID(sub);

    // 회원 가입 처리
    if (sub !== uid) {
      await this.registerUser(
        sub,
        refreshToken,
        email,
        email_verified,
        profile,
      );
    }

    // 로그인 처리
    return { accessToken, refreshToken, idToken };
  }

  async registerUser(
    sub: string,
    refreshToken: string,
    email: string,
    email_verified: boolean,
    profile: any,
  ) {
    const { id, picture } = profile;

    if (email_verified !== true) {
      throw new UnauthorizedException('Unverified email');
    }

    const userProfileEntity = await this.kakaoUserRepository.insertProfileInfo(
      id,
      picture,
    );

    await this.kakaoUserRepository.insertAccountInfo(
      sub,
      refreshToken,
      email,
      userProfileEntity,
    );
  }
}
