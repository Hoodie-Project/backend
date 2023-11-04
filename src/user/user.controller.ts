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

  @Post('/signin/kakao')
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenDto) {
    console.log('first', kakaoTokenDto);
    const { idToken, accessToken } = kakaoTokenDto;
    try {
      this.userService.kakaoSignIn(kakaoTokenDto);
      // const { validatedIdToken }
      //   this.authService.validateKakaoIdToken(idToken);

      return {
        idToken: idToken,
        accessToken: accessToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // @Post('/signin/google')
}
