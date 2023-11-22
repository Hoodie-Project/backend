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
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        global: true,
        secret: configService.get('KAKAO_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CommonAuthService, AuthRepository],
  exports: [AuthService, CommonAuthService, JwtModule],
})
export class AuthModule {}
