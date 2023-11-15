import { UserStatus } from '../types/user-status';
export declare class UserEntity {
    id: bigint;
    uid: number;
    email: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
