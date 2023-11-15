import { UserProfileEntity } from '@src/user/common/entity/user-profile.entity';
import { AccountStatus } from '@src/user/kakao/types/account-status';
export declare class UserAccountEntity {
    id: number;
    uid: string;
    refreshToken: string;
    email: string;
    status: AccountStatus;
    createdAt: Date;
    updatedAt: Date;
    profile: UserProfileEntity;
}
