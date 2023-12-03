import { Module } from '@nestjs/common';
import { CommonAuthService } from '@src/auth/service/common-auth.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (): Promise<JwtModuleOptions> => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CommonAuthService, AuthRepository],
  exports: [AuthService, CommonAuthService, JwtModule],
})
export class AuthModule {}
