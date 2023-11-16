import { KakaoUserService } from '@src/user/kakao/kakao-user.service';
import { KakaoTokenDto } from '@src/user/kakao/dto/kakao-token.dto';
export declare class KakaoUserController {
    private readonly kakaoUserService;
    constructor(kakaoUserService: KakaoUserService);
    sayHello(): {
        message: string;
    };
    kakaoSignIn(kakaoTokenDto: KakaoTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        id_token: string;
    }>;
    kakaoSignOut(accessToken: string, uid: string): Promise<any>;
    updateUser(uid: string, nickname: string): Promise<void>;
    updateUserImage(): void;
    deleteUser(uid: string): Promise<void>;
    getUserInfo(uid: string): Promise<import("../common/entity/user-account.entity").UserAccountEntity>;
}
