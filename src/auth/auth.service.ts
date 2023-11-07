import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async validateKakaoIdToken(idToken) {
    // 토큰 헤더, 페이로드, 서명 분리
    const { id_token } = idToken;
    console.log(id_token);
    const [header, payload, signature]: string[] = id_token.split('.');

    // 페이로드 유효성 검증
    await this.validateKakaoPayload(payload);

    // 서명 유효성 검증
    await this.validateKakaoSignature(signature);
  }

  async validateKakaoPayload(payload) {
    if (!payload) {
      throw new BadRequestException('No payload provided');
    }

    // 페이로드 디코딩
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const parsedPayload = JSON.parse(decodedPayload) as {
      iss: string;
      aud: string;
      exp: number;
      nonce: string;
    };

    const { iss, aud, exp, nonce } = parsedPayload;

    // 토큰 정보 요청
    const tokenInfo = await this.getIdTokenInfo(payload);
  }

  async getIdTokenInfo(payload: string) {
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

  async validateKakaoSignature(signature) {}

  /**
   * id token으로 사용자 정보 요청 및 로그인 처리
   * 1. 토큰 객체를 받아서 id token을 가져오기
   *  1-1. id token 유효성 검증하기
   *    ㄱ) 헤더, 페이로드, 서명 분리
   *    ㄴ) 페이로드 디코딩 (base64)
   *    ㄷ) iss, aud, exp, nonc 값 일치 확인 <=> id 토큰 정보로 확인
   *    ㄹ) 서명 검증
   *  1-1. refreshToken 저장하기
   * 2. id_token 안의 사용자 정보 받아오기
   *  2-1. 사용자 정보 저장하기
   * 3. 로그인 처리
   * 4. 로그아웃 처리
   *
   */
}
