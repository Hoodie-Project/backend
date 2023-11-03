import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { KakaoDto } from './dto/kakao-token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  sayHello() {
    return {
      message: 'hello',
    };
  }

  @Get('/kakao/userInfo')
  kakaoGetUserInfo(idToken: string) {
    return this.userService.kakaoGetUserInfo(idToken);
  }

  // https://kapi.kakao.com/v1/oidc/userinfo
  @Post('/kakao')
  kakaoSignIn(@Body() kakaoDto: KakaoDto) {
    try {
      return this.userService.kakaoSignIn(kakaoDto);
    } catch (error) {
      console.log(error);
    }
  }

  // @Post('/kakao/tokens')
  // kakaoGetTokens(code: string) {
  //   return this.userService.kakaoGetTokens(code);
  // }
}
