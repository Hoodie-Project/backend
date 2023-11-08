import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  image: string;
}

// export class TestDto {
//   uid: string;
//   refreshToken: string;
//   nickname: string;
//   image: string;
//   email: string;
// }
