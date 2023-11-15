import { CommonAuthService } from '../common/common-auth.provider';
export declare class GoogleAuthService {
    private readonly commonAuthService;
    constructor(commonAuthService: CommonAuthService);
    validateGoogleIdToken(idToken: string): Promise<void>;
    validateGooglePayload(payload: string): Promise<void>;
    validateGoogleSignature(header: string): Promise<any>;
    getDiscoveryDoc(): Promise<any>;
}
