import { UserAccountEntity } from './user-account.entity';
export declare class UserProfileEntity {
    id: number;
    nickname: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    account: UserAccountEntity;
}
