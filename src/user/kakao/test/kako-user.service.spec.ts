import { Test, TestingModule } from '@nestjs/testing';
import { KakaoUserService } from '@src/user/kakao/kakao-user.service';

describe('UserService', () => {
  let service: KakaoUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakaoUserService],
    }).compile();

    service = module.get<KakaoUserService>(KakaoUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});