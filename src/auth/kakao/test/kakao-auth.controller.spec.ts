import { Test, TestingModule } from '@nestjs/testing';
import { KakaoAuthController } from '@src/auth/kakao/kakao-auth.controller';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';

describe('AuthController', () => {
  let controller: KakaoAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KakaoAuthController],
      providers: [KakaoAuthService],
    }).compile();

    controller = module.get<KakaoAuthController>(KakaoAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
