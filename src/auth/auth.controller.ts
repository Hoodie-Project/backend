import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoTokenDto } from '../user/dto/kakao-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // tokenValidation(@Body() kakaoTokenDto: KakaoTokenDto) {
  //   const { idToken } = kakaoTokenDto;
  //   console.log(idToken);
  //   return this.authService.validateKakaoIdToken(idToken);
  // }
}
