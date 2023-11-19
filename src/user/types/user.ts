export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export interface UserProfile {
  nickname: string;
  image: string;
}

export interface AuthToken {
  access_token: string;
  refresh_token?: string;
}

export interface KakaoUserInfo {
  sub: string;
  nickname: string;
  picture: string;
  email: string;
}

export interface GoogleUserInfo {
  sub: string;
  email: string;
  email_verified: boolean;
  picture: string;
  name: string;
}
