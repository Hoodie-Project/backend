import { Module } from '@nestjs/common';
import { KakaoUserService } from '@src/user/kakao/kakao-user.service';
import { KakaoUserController } from '@src/user/kakao/kakao-user.controller';
import { KakaoUserRepository } from '@src/user/kakao/repository/kakao.repository';
import { AuthModule } from '@src/auth/auth.module';
import { GoogleUserController } from './google/google-user.controller';
import { GoogleUserService } from './google/google-user.service';

@Module({
  imports: [AuthModule],
  controllers: [KakaoUserController, GoogleUserController],
  providers: [KakaoUserService, KakaoUserRepository, GoogleUserService],
})
export class UserModule {}
