import { Module } from '@nestjs/common';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
import { KakaoAuthController } from '@src/auth/kakao/kakao-auth.controller';

@Module({
  controllers: [KakaoAuthController],
  providers: [KakaoAuthService],
  exports: [KakaoAuthService],
})
export class AuthModule {}
