import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KakaoUserService } from '@src/user/kakao/kakao-user.service';
import { KakaoTokenDto } from '@src/user/kakao/dto/kakao-token.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('kakao')
export class KakaoUserController {
  constructor(private readonly kakaoUserService: KakaoUserService) {}

  @Get('/hello')
  sayHello() {
    return {
      message: 'hello',
    };
  }

  @Post('/signin')
  @ApiOperation({ summary: '카카오 로그인 / 자동 회원가입' })
  @UsePipes(ValidationPipe)
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenDto) {
    console.log('connected');
    return this.kakaoUserService.kakaoSignIn(kakaoTokenDto);
  }

  @Post('/signout')
  @ApiOperation({ summary: '카카오 로그아웃' })
  kakaoSignOut(@Body('accessToken, uid') accessToken: string, uid: string) {
    return this.kakaoUserService.kakaoSignOut(accessToken, uid);
  }

  @Patch('/:uid')
  @ApiOperation({ summary: '유저 정보 수정' })
  @UsePipes(ValidationPipe)
  updateUser(@Param('uid') uid: string, @Body('nickname') nickname: string) {
    return this.kakaoUserService.updateUser(uid, nickname);
  }

  @Patch('/profile_image/:uid')
  @ApiOperation({ summary: '유저 프로필 이미지 수정 (TBD)' })
  @UsePipes(ValidationPipe)
  updateUserImage() {}

  @Delete('/:uid')
  @ApiOperation({ summary: '유저 삭제' })
  deleteUser(@Param('uid') uid: string) {
    return this.kakaoUserService.deleteUser(uid);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createUser(@Body() testDto: TestDto) {
  //   this.kakaoUserService.createUser(testDto);
  // }

  @Get('/info')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({
    description: '유저 정보 반환',
    type: KakaoTokenDto,
  })
  getUserInfo(@Param('uid') uid: string) {
    return this.kakaoUserService.getUserInfo(uid);
  }
}
