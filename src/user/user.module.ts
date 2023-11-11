import { Module } from '@nestjs/common';
import { KakaoUserService } from '@src/user/kakao/kakao-user.service';
import { KakaoUserController } from '@src/user/kakao/kakao-user.controller';
import { KakaoUserRepository } from '@src/user/kakao/repository/kakao.repository';
import { AuthModule } from '@src/auth/auth.module';
import { GoogleController } from './google/test/google.controller';
import { GoogleService } from './google/google.service';

@Module({
  imports: [AuthModule],
  controllers: [KakaoUserController, GoogleController],
  providers: [KakaoUserService, KakaoUserRepository, GoogleService],
})
export class UserModule {}
