import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { CommonAuthService } from '@src/auth/common-auth.provider';
import {
  DiscoveryDoc,
  GoogleIdTokenPayload,
  IdTokenPayload,
  JWT,
} from './type/auth';
import { GoogleUserInfo } from '@src/user/types/user';

@Injectable()
export class AuthService {
  constructor(private readonly commonAuthService: CommonAuthService) {}

  async validateKakaoIdToken(idToken: string): Promise<void> {
    if (!idToken) {
      throw new BadRequestException('No payload provided');
    }

    // 토큰 헤더, 페이로드, 서명 분리
    const [header, payload]: string[] = idToken.split('.');

    // 페이로드 유효성 검증
    await this.validateKakaoPayload(payload);

    // 서명 유효성 검증
    await this.validateKakaoSignature(header);
  }

  async validateKakaoPayload(payload: string): Promise<void> {
    const { iss, aud, exp, nonce }: IdTokenPayload =
      await this.getKakaoIdTokenInfo(payload);

    await this.commonAuthService.validateIss(iss);
    await this.commonAuthService.validateAud(aud);
    await this.commonAuthService.validateExp(exp);
    await this.commonAuthService.validateNonce(nonce);
  }

  /**
   * function: 카카오 서명 유효성 검증 로직
   * @param {string} header idToken의 헤더
   * @returns
   */
  async validateKakaoSignature(header: string): Promise<string> {
    let kakaoPublicKey: string | null;
    if (!header) {
      throw new BadRequestException('No header provided');
    }
    const kid = await this.commonAuthService.decodeHeader(header);

    if (!kakaoPublicKey) {
      const publickeyArr = await this.getKakaoPublicKeys();
      const kakaoPublicKey = await this.commonAuthService.validateKid(
        publickeyArr,
        kid,
      );
      return kakaoPublicKey;
    }

    return kakaoPublicKey;
  }

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

  async validateGoogleIdToken(idToken: string): Promise<GoogleUserInfo> {
    const [header, payload]: string[] = idToken.split('.');
    // 페이로드 유효성 검증
    const validatedPayload: GoogleUserInfo =
      await this.validateGooglePayload(payload);

    // 서명 유효성 검증
    await this.validateGoogleSignature(header);
    return validatedPayload;
  }

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

  async validateGoogleSignature(header: string): Promise<string> {
    let googlePublicKey: string | null;
    if (!header) {
      throw new BadRequestException('No header provided');
    }

    const kid = await this.commonAuthService.decodeHeader(header);

    if (!googlePublicKey) {
      const publicKeyArr: [] = await this.getDiscoveryDoc();
      const googlePublicKey = await this.commonAuthService.validateKid(
        publicKeyArr,
        kid,
      );
      return googlePublicKey;
    }

    return googlePublicKey;
  }

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
}
