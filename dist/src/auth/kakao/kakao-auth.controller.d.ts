import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
export declare class KakaoAuthController {
    private readonly kakaoAuthService;
    constructor(kakaoAuthService: KakaoAuthService);
    tokenValidation(idToken: string): Promise<void>;
}
