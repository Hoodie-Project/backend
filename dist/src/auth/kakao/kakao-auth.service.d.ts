import { CommonAuthService } from '../common/common-auth.provider';
export declare class KakaoAuthService {
    private readonly commonAuthService;
    constructor(commonAuthService: CommonAuthService);
    validateKakaoIdToken(idToken: string): Promise<void>;
    validateKakaoPayload(payload: string): Promise<void>;
    validateKakaoSignature(header: string): Promise<any>;
    getKakaoPublicKey(): Promise<any>;
    getKakaoIdTokenInfo(payload: string): Promise<any>;
}
