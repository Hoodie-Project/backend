import { Module } from '@nestjs/common';
import { KakaoUserService } from '@src/user/kakao/kakao-user.service';
import { KakaoUserController } from '@src/user/kakao/kakao-user.controller';
import { UserRepository } from '@src/user/common/repository/user.repository';
import { AuthModule } from '@src/auth/auth.module';
import { GoogleUserController } from './google/google-user.controller';
import { GoogleUserService } from './google/google-user.service';

@Module({
  imports: [AuthModule],
  controllers: [KakaoUserController, GoogleUserController],
  providers: [KakaoUserService, UserRepository, GoogleUserService],
})
export class UserModule {}
