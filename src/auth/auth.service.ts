import { Injectable } from '@nestjs/common';
import { KakaoTokenDto } from '../user/dto/kakao-token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateKakaoIdToken(idToken: string) {}

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
