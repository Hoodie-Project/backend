import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleTokenDto } from './dto/google-token.dto';
import { UserRepository } from '../common/repository/user.repository';
import { GoogleAuthService } from '@src/auth/google/google-auth.service';
import { CommonAuthService } from '@src/auth/common/common-auth.provider';

@Injectable()
export class GoogleUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly googleAuthService: GoogleAuthService,
    private readonly commonAuthService: CommonAuthService,
  ) {}

  async googleSignIn(googleTokenDto: GoogleTokenDto) {
    const { access_token, refresh_token, id_token } = googleTokenDto;
    const [payload]: string[] = id_token.split('.');

    // idToken 유효성 검증
    await this.googleAuthService.validateGoogleIdToken(id_token);

    // sub 비교
    const { sub, email, email_verified, profile } =
      await this.commonAuthService.decodePayload(payload);

    const { uid } = await this.userRepository.getUserByUID(sub);

    // 회원 가입 처리
    if (sub !== uid) {
      await this.registerUser(
        sub,
        refresh_token,
        email,
        email_verified,
        profile,
      );
    }

    // 로그인 처리
    return { access_token, refresh_token, id_token };
  }

  async registerUser(
    sub: string,
    refresh_token: string,
    email: string,
    email_verified: boolean,
    profile: any,
  ) {
    const { id, picture } = profile;

    if (email_verified !== true) {
      throw new UnauthorizedException('Unverified email');
    }

    const userProfileEntity = await this.userRepository.insertProfileInfo(
      id,
      picture,
    );

    await this.userRepository.insertAccountInfo(
      sub,
      refresh_token,
      email,
      userProfileEntity,
    );
  }
}
