import { DataSource } from 'typeorm';
import { UserProfileEntity } from '@src/user/common/entity/user-profile.entity';
import { UserAccountEntity } from '@src/user/common/entity/user-account.entity';
export declare class UserRepository {
    private readonly dataSource;
    private userProfileRepository;
    private userAccountRepository;
    constructor(dataSource: DataSource);
    insertAccountInfo(sub: string, refreshToken: string, email: string, profile: UserProfileEntity): Promise<void>;
    insertProfileInfo(nickname: string, image: string): Promise<{
        nickname: string;
        image: string;
    } & UserProfileEntity>;
    getUserByUID(uid: string): Promise<UserAccountEntity>;
    getUserInfoByUID(uid: string): Promise<UserAccountEntity>;
    updateUserInfoByUID(id: number, nickname: string): Promise<void>;
    deleteUserByUID(uid: string): Promise<void>;
}
