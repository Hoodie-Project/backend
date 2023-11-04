import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { KakaoTokenDto } from './dto/kakao-token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  sayHello() {
    return {
      message: 'hello',
    };
  }

  /**
   * id token으로 사용자 정보 요청 및 로그인 처리
   * 1. 토큰 객체를 받아서 id token을 가져오기
   *  1-1. id token 유효성 검증하기
   *  1-1. refreshToken 저장하기
   * 2. id_token 안의 사용자 정보 받아오기 ----회원 확인 및 가입
   *  2-1. 사용자 정보 저장하기
   * 3. 로그인 처리
   * 4. 로그아웃 처리
   *
   */

  // https://kapi.kakao.com/v1/oidc/userinfo
  @Post('/signin/kakao')
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenDto) {
    const { idToken } = kakaoTokenDto;
    try {
      this.userService.kakaoSignIn(kakaoTokenDto);
      // const { validatedIdToken } =
      //   this.authService.validateKakaoIdToken(idToken);

      return {
        idToken: idToken,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
