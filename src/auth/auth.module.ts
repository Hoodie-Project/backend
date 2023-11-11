import { Module } from '@nestjs/common';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
import { KakaoAuthController } from '@src/auth/kakao/kakao-auth.controller';
import { GoogleService } from './google/google.service';
import { GoogleController } from './google/google.controller';

@Module({
  controllers: [KakaoAuthController, GoogleController],
  providers: [KakaoAuthService, GoogleService],
  exports: [KakaoAuthService],
})
export class AuthModule {}
