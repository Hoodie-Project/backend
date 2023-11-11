import { Module } from '@nestjs/common';
import { KakaoUserService } from '@src/user/kakao-user.service';
import { KakaoUserController } from '@src/user/kakao-user.controller';
import { UserRepository } from '@src/user/repository/user.repository';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [KakaoUserController],
  providers: [KakaoUserService, UserRepository],
})
export class UserModule {}
