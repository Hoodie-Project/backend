import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoTokenDto } from 'src/user/dto/kakao-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  tokenValidation(@Body() idToken: string) {
    return this.authService.validateKakaoIdToken(idToken);
  }
}
