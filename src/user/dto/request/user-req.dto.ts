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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
