import { UserRepository } from '@src/user/common/repository/user.repository';
import { KakaoTokenDto } from '@src/user/kakao/dto/kakao-token.dto';
import { KakaoAuthService } from '@src/auth/kakao/kakao-auth.service';
export declare class KakaoUserService {
    private readonly kakaoAuthService;
    private userRepository;
    constructor(kakaoAuthService: KakaoAuthService, userRepository: UserRepository);
    kakaoSignIn(kakaoTokenDto: KakaoTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        idToken: string;
    }>;
    kakaoSignOut(accessToken: string, uid: string): Promise<any>;
    getKakaoUserInfo(accessToken: string): Promise<{
        sub: any;
        nickname: any;
        picture: any;
        email: any;
    }>;
    registerUser(accessToken: string, refreshToken: string): Promise<void>;
    updateUser(uid: string, nickname: string): Promise<void>;
    deleteUser(uid: string): Promise<void>;
    getUserInfo(uid: string): Promise<import("../common/entity/user-account.entity").UserAccountEntity>;
}
