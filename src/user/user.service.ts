import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@src/user/user.repository';
import { AuthService } from '@src/auth/service/auth.service';
import { KakaoTokenReqDto } from '@src/user/dto/request/kakao-req.dto';
import axios from 'axios';
import {
  AccountStatus,
  AuthToken,
  GoogleUserInfo,
  KakaoUserInfo,
} from '@src/types/user';
import { GoogleTokenReqDto } from './dto/request/google-req.dto';
import { KakaoSignOutReqDto } from './dto/request/kakao-req.dto';
import { NicknameReqDto, UidReqDto } from './dto/request/user-req.dto';
import { UserAccountEntity } from './entity/user-account.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  /**
   * function: 카카오톡 OIDC 로그인 & 자동 회원 가입
   * @param kakaoTokenDto 카카오 요청 토큰 Dto
   * @returns accessToken, refreshToken
   */
  async kakaoSignIn(kakaoTokenDto: KakaoTokenReqDto): Promise<AuthToken> {
    const { access_token, refresh_token, id_token } = kakaoTokenDto;

    await this.authService.validateKakaoIdToken(id_token);

    const { sub } = await this.getKakaoUserInfo(access_token);
    const user = await this.userRepository.getUserByUID(sub);

    // 회원 가입 처리
    if (user === null) {
      this.registerKakaoUser(access_token, refresh_token, sub);
    }

    // 로그인 처리
    return { access_token, refresh_token };
  }

  /**
   * function: 카카오 유저 정보 입력
   * @param accessToken
   * @param refreshToken
   */
  async registerKakaoUser(
    access_token: string,
    refresh_token: string,
    sub: string,
  ): Promise<void> {
    const { nickname, picture, email }: KakaoUserInfo =
      await this.getKakaoUserInfo(access_token);

    const { status } = await this.userRepository.getUserInfoByUID(sub);

    if (status === AccountStatus.INACTIVE) {
      await this.userRepository.activateAccountStatus(sub);
    }

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

  /**
   * function: 카카오 로그아웃
   * @param accessToken
   * @param uid 회원 번호
   * @returns 로그아웃된 회원 번호
   */
  async kakaoSignOut(kakaoSignOutDto: KakaoSignOutReqDto): Promise<string> {
    const { access_token, uid } = kakaoSignOutDto;
    if (!access_token) {
      throw new BadRequestException('No accessToken provided');
    }

    const reqHeader = {
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
        headers: reqHeader,
        data: reqBody,
      });

      const { id } = response.data;

      console.log(response);
      return id;
    } catch (error) {
      throw new BadRequestException('Failed to sign out');
    }
  }

  /**
   * function: 사용자 정보 반환
   * @param accessToken
   * @returns 사용자 정보 객체
   */
  async getKakaoUserInfo(access_token: string): Promise<KakaoUserInfo> {
    if (!access_token) {
      throw new BadRequestException('No accessToken provided');
    }

    const reqHeader = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      const response = await axios.get(
        process.env.KAKAO_USERINFO_URL,
        reqHeader,
      );
      const { sub, nickname, picture, email } = response.data;
      return { sub, nickname, picture, email };
    } catch (error) {
      throw new UnauthorizedException('Failed to get user information');
    }
  }

  /**
   * function: 구글 로그인
   * @param googleTokenDto 구글 요청 토큰 Dto
   * @returns access_token, refresh_token
   */
  async googleSignIn(googleTokenDto: GoogleTokenReqDto): Promise<AuthToken> {
    const { access_token, refresh_token, id_token } = googleTokenDto;

    // idToken 유효성 검증
    const googleUserInfo: GoogleUserInfo =
      await this.authService.validateGoogleIdToken(id_token);
    const user = await this.userRepository.getUserByUID(googleUserInfo.sub);

    // 회원 가입 처리
    if (user === null) {
      await this.registerGoogleUser(googleUserInfo, refresh_token);
    }

    // 로그인 처리
    return { access_token, refresh_token };
  }

  /**
   * function: 구글 유저 정보 입력
   * @param googleUserInfo
   * @param refresh_token
   */
  async registerGoogleUser(
    googleUserInfo: GoogleUserInfo,
    refresh_token: string,
  ): Promise<void> {
    const { sub, email, email_verified, picture, name } = googleUserInfo;
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

  /**
   * function: 유저 정보 슈정
   * @param uidDto 유저 번호 요청 Dto
   * @param nicknameDto 닉네임 요청 Dto
   */
  async updateUser(
    uidDto: UidReqDto,
    nicknameDto: NicknameReqDto,
  ): Promise<void> {
    const { status, profile } = await this.userRepository.getUserInfoByUID(
      uidDto.uid,
    );

    if (status !== AccountStatus.ACTIVE) {
      throw new UnauthorizedException(`This user is ${status}`);
    }
    await this.userRepository.updateUserInfoByUID(
      profile.id,
      nicknameDto.nickname,
    );
  }

  /**
   * function: 유저 정보 삭제
   * @param uidDto 유저 번호 요청 Dto
   */
  async deleteUser(uidDto: UidReqDto): Promise<void> {
    const { uid } = await this.userRepository.getUserByUID(uidDto.uid);

    if (uid === uidDto.uid) {
      await this.userRepository.deleteUserByUID(uid);
    }
  }

  /**
   * function: 유저 정보 반환
   * @param uidDto 유저 번호 요청 Dto
   * @returns 유저 정보 반환
   */
  async getUserInfo(uidDto: UidReqDto): Promise<UserAccountEntity> {
    return await this.userRepository.getUserInfoByUID(uidDto.uid);
  }
}
