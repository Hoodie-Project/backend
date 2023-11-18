import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleIdTokenPayload, JWT } from './type/auth';

@Injectable()
export class CommonAuthService {
  /**
   * function: 토큰 issuer 유효성 검증
   * @param iss
   */
  async validateIss(iss: string): Promise<void> {
    const issuer = iss.split('.')[1];

    if (issuer === 'kakao') {
      if (iss !== process.env.KAKAO_ISSUER) {
        throw new UnauthorizedException('Wrong kakao issuer');
      }
      return;
    }

    if (issuer === 'google') {
      if (iss !== process.env.GOOGLE_ISSUER) {
        throw new UnauthorizedException('Wrong google issuer');
      }
      return;
    }
  }

  /**
   * function: 토큰의 audience 유효성 검증
   * @param aud
   */
  async validateAud(aud: string): Promise<void> {
    const googleAud: string = aud.split('.').reverse[1];

    if (googleAud === 'googleusercontent') {
      if (googleAud !== process.env.GOOGLE_CLIENT_ID) {
        throw new UnauthorizedException('Wrong google client key');
      }
      return;
    }

    if (aud === process.env.KAKAO_CLIENT_ID) {
      if (aud !== process.env.KAKAO_CLIENT_ID) {
        throw new UnauthorizedException('Wrong kakao client key');
      }
      return;
    }
  }

  /**
   * function: 토큰의 만료기간(expiration) 유효성 검증
   * @param exp
   */
  async validateExp(exp: number): Promise<void> {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    if (exp < currentTimestamp) {
      throw new UnauthorizedException('Expired IdToken');
    }
    return;
  }

  /**
   * function: 토큰의 nonce 유효성 검증
   * @param nonce
   */
  async validateNonce(nonce: string): Promise<void> {
    if (nonce !== process.env.NONCE) {
      throw new UnauthorizedException('Wrong Nonce value');
    }
    return;
  }

  /**
   * function: 토큰의 kid 유효성 검증
   * @param publickeyArr 토큰의 공개키 목록 배열
   * @param kid
   */
  async validateKid(publickeyArr: JWT[], kid: string): Promise<string> {
    const publicKey = publickeyArr.find((key) => key.kid === kid).kid;

    if (publicKey === undefined) {
      throw new UnauthorizedException('wrong public key');
    }
    return publicKey;
  }

  /**
   * function: 토큰의 header를 디코딩하여 kid 값 반환
   * @param header 토큰의 header 값
   * @returns kid
   */
  async decodeHeader(header: string): Promise<string> {
    const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
    const { kid } = JSON.parse(decodedHeader);

    return kid;
  }

  /**
   * function: 토큰의 payload 디코드
   * @param payload 토큰의 payload 값
   * @returns 디코딩 & 파싱된 payload
   */
  async decodePayload(payload: string): Promise<GoogleIdTokenPayload> {
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const parsedDecodedPayload = JSON.parse(decodedPayload);
    return parsedDecodedPayload;
  }
}
