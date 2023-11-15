import { GoogleUserService } from './google-user.service';
import { GoogleTokenDto } from './dto/google-token.dto';
export declare class GoogleUserController {
    private googleUserService;
    constructor(googleUserService: GoogleUserService);
    googleSignIn(googleTokenDto: GoogleTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        idToken: string;
    }>;
}
