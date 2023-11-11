import { Module } from '@nestjs/common';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
import { KakaoAuthController } from '@src/auth/kakao/kakao-auth.controller';
import { GoogleAuthService } from './google/google.service';
import { GoogleAuthController } from './google/google.controller';

@Module({
  controllers: [KakaoAuthController, GoogleAuthController],
  providers: [KakaoAuthService, GoogleAuthService],
  exports: [KakaoAuthService, GoogleAuthService],
})
export class AuthModule {}
