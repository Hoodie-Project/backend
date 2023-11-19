import { Module } from '@nestjs/common';
import { CommonAuthService } from '@src/auth/common-auth.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
        secret: {
          kakao: configService.get('KAKAO_SECRET'),
          google: configService.get('GOOGLE_SECRET'),
        },
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
