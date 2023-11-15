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

    // idToken 유효성 검증
    const { sub, email, email_verified, picture, name } =
      await this.googleAuthService.validateGoogleIdToken(id_token);
    const user = await this.userRepository.getUserByUID(sub);

    // 회원 가입 처리
    if (user === null) {
      await this.registerUser(
        sub,
        email,
        email_verified,
        picture,
        name,
        refresh_token,
      );
    }

    // 로그인 처리
    return { access_token, refresh_token, id_token };
  }

  async registerUser(sub, email, email_verified, picture, name, refresh_token) {
    if (email_verified !== true) {
      throw new UnauthorizedException('Unverified email');
    }

    const userProfileEntity = await this.userRepository.insertProfileInfo(
      name,
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
