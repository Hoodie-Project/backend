import { GoogleUserService } from './google-user.service';
import { GoogleTokenDto } from './dto/google-token.dto';
export declare class GoogleUserController {
    private googleUserService;
    constructor(googleUserService: GoogleUserService);
    googleSignIn(googleTokenDto: GoogleTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        id_token: string;
    }>;
}
