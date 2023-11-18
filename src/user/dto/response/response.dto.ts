import { ApiProperty } from '@nestjs/swagger';
import { UserAccountEntity } from '@src/user/entity/user-account.entity';
import { UserProfileEntity } from '@src/user/entity/user-profile.entity';
import { AccountStatus } from '@src/user/types/user';
import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleUserResDto {
  sub: string;
  email: string;
  email_verified: boolean;
  picture: string;
  name: string;
  refresh_token: string;
}

export class AuthTokenResDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class KakaoSignOutResDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UserProfile {
  nickname: string;
  image: string;
}

export class Date {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UserInfoResDto extends UserAccountEntity {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: AccountStatus, enumName: 'AccountStatus' })
  status: AccountStatus;

  @ApiProperty({ type: UserProfileEntity })
  profile: UserProfileEntity;
}
