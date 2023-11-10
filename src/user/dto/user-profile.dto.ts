import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  image: string;
}

