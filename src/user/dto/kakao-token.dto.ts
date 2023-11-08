import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class KakaoTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idToken: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  refreshTokenExpiresIn: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  scope: string;
}
