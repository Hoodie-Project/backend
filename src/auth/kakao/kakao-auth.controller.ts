import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';

@Controller('auth')
export class KakaoAuthController {
  constructor(private readonly kakaoAuthService: KakaoAuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  tokenValidation(@Body('idToken') idToken: string) {
    return this.kakaoAuthService.validateKakaoIdToken(idToken);
  }
}
