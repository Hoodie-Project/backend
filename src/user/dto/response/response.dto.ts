import { ApiProperty } from '@nestjs/swagger';
import { UserAccountEntity } from '@src/common/entity/user-account.entity';
import { UserProfileEntity } from '@src/common/entity/user-profile.entity';
import { AccountStatus } from '@src/common/types/user';
import { IsString, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';

export class GoogleUserResDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sub: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsString()
  email_verified: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
}

export class UserInfoResDto extends UserAccountEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ enum: AccountStatus, enumName: 'AccountStatus' })
  @IsNotEmpty()
  @IsEnum({ AccountStatus })
  status: AccountStatus;

  @ApiProperty({ type: UserProfileEntity })
  @IsNotEmpty()
  @IsString()
  profile: UserProfileEntity;
}
