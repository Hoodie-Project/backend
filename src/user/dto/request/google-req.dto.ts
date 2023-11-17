import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GoogleTokenReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  expires_in: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  scope: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
