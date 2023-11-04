import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  tokenValidation(@Body() idToken) {
    return this.authService.validateKakaoIdToken(idToken);
  }
}
