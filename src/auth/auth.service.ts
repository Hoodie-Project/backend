import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@src/user/repository/user.repository';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly userRepository: UserRepository;
  async validateKakaoIdToken(idToken) {
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

    if (iss !== process.env.KAKAO_ISSUER) {
      throw new UnauthorizedException('Wrong issuer');
    }

    if (aud !== process.env.KAKAO_CLIENT_ID) {
      throw new UnauthorizedException('Wrong client key');
    }

    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    if (exp < currentTimestamp) {
      throw new UnauthorizedException('Expired IdToken');
    }

    if (!nonce) {
      throw new UnauthorizedException('Nonce required');
    }
  }

  /**
   * function: 카카오 서명 유효성 검증
   * @param {string} header idToken의 헤더
   * @returns true를 반환
   */
  async validateKakaoSignature(header: string) {
    if (!header) {
      throw new BadRequestException('No header provided');
    }

    const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
    const { kid } = JSON.parse(decodedHeader);

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
