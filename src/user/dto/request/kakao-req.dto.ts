import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class KakaoTokenReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  expires_in: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refresh_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  refresh_token_expires_in: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  scope: string;
}

export class KakaoSignOutReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uid: string;
}
