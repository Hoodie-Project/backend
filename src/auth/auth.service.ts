import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { CommonAuthService } from '@src/auth/common-auth.provider';
import { GoogleIdTokenPayload, IdTokenPayload, JWT } from './type/auth';
import { AuthToken, GoogleUserInfo } from '@src/user/types/user';
import { JwtService } from '@nestjs/jwt';
import { KakaoGenerateToken } from '@src/user/types/kakao';
import { AuthRepository } from './auth.repository';
import { KakaoAccessTokenReqDto } from '@src/user/dto/request/kakao-req.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonAuthService: CommonAuthService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * function: 카카오 ID Token 유효성 검증
   * @param idToken
   */
  async validateKakaoIdToken(idToken: string): Promise<void> {
    if (!idToken) {
      throw new BadRequestException('No payload provided');
    }

    const [header, payload]: string[] = idToken.split('.');

    await this.validateKakaoPayload(payload);
    await this.validateKakaoSignature(idToken, header);
  }

  /**
   * function: 카카오 ID Token payload의 유효성 검증
   * @param payload
   */
  async validateKakaoPayload(payload: string): Promise<void> {
    const { iss, aud, exp, nonce }: IdTokenPayload =
      await this.getKakaoIdTokenInfo(payload);

    await this.commonAuthService.validateIss(iss);
    await this.commonAuthService.validateAud(aud);
    await this.commonAuthService.validateExp(exp);
    await this.commonAuthService.validateNonce(nonce);
  }

  /**
   * function: 카카오 ID Token signature 유효성 검증
   * @param idToken
   * @param header
   */
  async validateKakaoSignature(idToken: string, header: string): Promise<void> {
    if (!header) {
      throw new BadRequestException('No header provided');
    }

    let kakaoPublicKey: string | null;
    const kid = await this.commonAuthService.decodeHeader(header);

    if (!kakaoPublicKey) {
      const publickeyArr = await this.getKakaoPublicKeys();
      kakaoPublicKey = await this.commonAuthService.validateKid(
        publickeyArr,
        kid,
      );
    }

    try {
      await this.jwtService.verifyAsync(idToken, { publicKey: kakaoPublicKey });
    } catch (error) {
      throw new UnauthorizedException({ message: 'wrong public key' }, error);
    }
  }

  /**
   * function: 카카오 공개키 목록 조회
   * @returns 공개키 목록 배열
   */
  async getKakaoPublicKeys(): Promise<JWT[]> {
    try {
      const response = await axios.get(process.env.KAKAO_PUBLICKEY_URL);
      const publickeyArr = response.data.keys;
      return publickeyArr;
    } catch (error) {
      // this.logger.error(error);
      throw new InternalServerErrorException('Failed to get public key');
    }
  }

  /**
   * function: 카카오 ID Token 정보 조회
   * @param payload
   * @returns 토큰 정보 객체
   */
  async getKakaoIdTokenInfo(payload: string): Promise<IdTokenPayload> {
    if (!payload) {
      throw new BadRequestException('No payload provided');
    }

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    try {
      const response = await axios({
        method: 'POST',
        url: process.env.KAKAO_TOKENINFO_URL,
        timeout: 30000,
        headers,
        data: payload,
      });

      console.log('hello', response);
      return response.data;
    } catch (error) {
      // this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to get id token information',
      );
    }
  }

  /**
   * function: 구글 ID Token 유효성 검증
   * @param idToken
   * @returns 유효성 검증된 ID Token의 payload
   */
  async validateGoogleIdToken(idToken: string): Promise<GoogleUserInfo> {
    const [header, payload]: string[] = idToken.split('.');
    // 페이로드 유효성 검증
    const validatedPayload: GoogleUserInfo =
      await this.validateGooglePayload(payload);

    // 서명 유효성 검증
    await this.validateGoogleSignature(idToken, header);
    return validatedPayload;
  }

  /**
   * function: 구글 ID Token payload 유효성 검증
   * @param payload
   * @returns 유저 정보 객체
   */
  async validateGooglePayload(payload: string): Promise<GoogleUserInfo> {
    const {
      sub,
      iss,
      aud,
      exp,
      nonce,
      email,
      email_verified,
      picture,
      name,
    }: GoogleIdTokenPayload =
      await this.commonAuthService.decodePayload(payload);

    await this.commonAuthService.validateIss(iss);
    await this.commonAuthService.validateAud(aud);
    await this.commonAuthService.validateExp(exp);
    await this.commonAuthService.validateNonce(nonce);
    return { sub, email, email_verified, picture, name };
  }

  /**
   * function: 구글 ID Token signature 유효성 검증
   * @param idToken
   * @param header
   */
  async validateGoogleSignature(idToken: string, header: string) {
    if (!header) {
      throw new BadRequestException('No header provided');
    }

    let googlePublicKey: string | null;
    const kid = await this.commonAuthService.decodeHeader(header);

    if (!googlePublicKey) {
      const publicKeyArr: [] = await this.getDiscoveryDoc();
      googlePublicKey = await this.commonAuthService.validateKid(
        publicKeyArr,
        kid,
      );
    }

    try {
      await this.jwtService.verifyAsync(idToken, {
        publicKey: googlePublicKey,
      });
    } catch (error) {
      throw new UnauthorizedException({ message: 'wrong public key' }, error);
    }
  }

  /**
   * function: 구글 공개키 목록 조회
   * @returns 공개키 목록 배열
   */
  async getDiscoveryDoc(): Promise<[]> {
    try {
      const discoveryDoc = await axios.get(process.env.GOOGLE_DISCOVERY_DOC);
      const jwkURL = discoveryDoc.data.jwks_uri;
      const jwkResponse = await axios.get(jwkURL);
      const publicKeyArr = jwkResponse.data.keys;
      return publicKeyArr;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get discovery document',
      );
    }
  }

  async verifyTokenExpiration(accessToken: string, uid: string) {
    const refreshToken: string = await this.authRepository.getRefreshToken(uid);

    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.KAKAO_SECRET,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const newTokens = await this.regenerateKakaoTokens(refreshToken);
        return newTokens;
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException({
          name: error.name,
          message: error.message,
        });
      }
    }
  }

  async regenerateKakaoTokens(refresh_token: string): Promise<AuthToken> {
    const reqHeader = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const reqBody: KakaoGenerateToken = {
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_CLIENT_ID,
      refresh_token: `${refresh_token}`,
      client_secret: process.env.KAKAO_SECRET,
    };

    try {
      const response = await axios({
        method: 'POST',
        url: process.env.KAKAO_GENERATE_TOKEN_URL,
        timeout: 30000,
        headers: reqHeader,
        data: reqBody,
      });

      const { access_token, refresh_token }: AuthToken = response.data;

      if (!response.data.refresh_token) {
        return { access_token };
      }

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to regenerate kakao tokens',
      );
    }
  }

  async getAccessTokenInfo(access_token: string): Promise<number> {
    if (!access_token) {
      throw new BadRequestException('No access token provided');
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      const response = await axios.get(
        process.env.KAKAO_ACCESSTOKEN_INFO_URL,
        headers,
      );

      const { expires_in } = response.data;
      return expires_in;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get access token information',
      );
    }
  }
}
