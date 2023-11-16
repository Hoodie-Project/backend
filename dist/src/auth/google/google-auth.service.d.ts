import { CommonAuthService } from '../common/common-auth.provider';
export declare class GoogleAuthService {
    private readonly commonAuthService;
    constructor(commonAuthService: CommonAuthService);
    validateGoogleIdToken(idToken: string): Promise<{
        sub: any;
        email: any;
        email_verified: any;
        picture: any;
        name: any;
    }>;
    validateGooglePayload(payload: string): Promise<{
        sub: any;
        email: any;
        email_verified: any;
        picture: any;
        name: any;
    }>;
    validateGoogleSignature(header: string): Promise<any>;
    getDiscoveryDoc(): Promise<any>;
}
