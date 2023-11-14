import { Module } from '@nestjs/common';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
import { KakaoAuthController } from '@src/auth/kakao/kakao-auth.controller';
import { GoogleAuthService } from './google/google-auth.service';
import { GoogleAuthController } from './google/google.controller';
import { CommonAuthService } from './common/common-auth.provider';

@Module({
  controllers: [KakaoAuthController, GoogleAuthController],
  providers: [KakaoAuthService, GoogleAuthService, CommonAuthService],
  exports: [KakaoAuthService, GoogleAuthService, CommonAuthService],
})
export class AuthModule {}
