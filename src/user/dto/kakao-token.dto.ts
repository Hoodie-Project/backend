import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class KakaoTokenDto {
  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  idToken: string;

  expiresIn: number;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsNumber()
  refreshTokenExpiresIn: number;

  @IsNotEmpty()
  @IsString()
  scope: string;
}
