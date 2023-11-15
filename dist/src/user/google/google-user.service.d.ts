import { GoogleTokenDto } from './dto/google-token.dto';
import { UserRepository } from '../common/repository/user.repository';
import { GoogleAuthService } from '@src/auth/google/google-auth.service';
import { CommonAuthService } from '@src/auth/common/common-auth.provider';
export declare class GoogleUserService {
    private readonly userRepository;
    private readonly googleAuthService;
    private readonly commonAuthService;
    constructor(userRepository: UserRepository, googleAuthService: GoogleAuthService, commonAuthService: CommonAuthService);
    googleSignIn(googleTokenDto: GoogleTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        id_token: string;
    }>;
    registerUser(sub: string, refresh_token: string, email: string, email_verified: boolean, profile: any): Promise<void>;
}
