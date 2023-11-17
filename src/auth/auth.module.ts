import { Module } from '@nestjs/common';
import { CommonAuthService } from '@src/auth/common-auth.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CommonAuthService],
  exports: [AuthService, CommonAuthService],
})
export class AuthModule {}
