import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UidReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uid: string;
}

export class NicknameReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;
}

export class TokenReqDto {
  access_token: string;
  refresh_token: string;
}
