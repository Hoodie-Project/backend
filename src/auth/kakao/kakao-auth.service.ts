import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { CommonAuthService } from '../common/idtoken-validation.provider';

@Injectable()
export class KakaoAuthService {
  constructor(private readonly commonAuthService: CommonAuthService) {}
  async validateKakaoIdToken(idToken: string) {
    // 토큰 헤더, 페이로드, 서명 분리
    const [header, payload]: string[] = idToken.split('.');

    // 페이로드 유효성 검증
    await this.validateKakaoPayload(payload);

    // 서명 유효성 검증
    await this.validateKakaoSignature(header);
  }

  async validateKakaoPayload(payload: string) {
    if (!payload) {
      throw new BadRequestException('No payload provided');
    }

    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const { iss, aud, exp, nonce } = JSON.parse(decodedPayload);

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
  async validateKakaoSignature(header: string) {
    if (!header) {
      throw new BadRequestException('No header provided');
    }

    const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
    const { kid } = JSON.parse(decodedHeader);

    // 공개키 캐싱 로직 필요

    const publicKeyList = await this.getKakaoPublicKey();
    const confirmedKey = publicKeyList.find((key) => key.kid === kid);

    if (confirmedKey === undefined) {
      throw new BadRequestException('Wrong public key');
    }

    // 서명 검증 로직 필요
  }

  async getKakaoPublicKey() {
    try {
      const response = await axios.get(process.env.KAKAO_PUBLICKEY_URL);
      const keyArr = response.data;
      const publicKeyList = keyArr.map((list) => list.kid);
      return publicKeyList;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get public key');
    }
  }

  async getKakaoIdTokenInfo(payload: string) {
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
      console.log(error);
    }
  }
}
