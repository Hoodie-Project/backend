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
import { UserService } from '@src/user/user.service';
import { KakaoTokenDto } from '@src/user/dto/request/kakao-token.dto';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { GoogleTokenDto } from './dto/request/google-token.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.kakaoSignIn(kakaoTokenDto);
  }

  @Post('/signout')
  @ApiOperation({ summary: '카카오 로그아웃' })
  kakaoSignOut(@Body('accessToken, uid') accessToken: string, uid: string) {
    return this.userService.kakaoSignOut(accessToken, uid);
  }

  @Post('/signin')
  @ApiOperation({ summary: '구글 로그인' })
  @ApiOkResponse({
    description: '구글 로그인 성공',
    type: GoogleTokenDto,
  })
  @UsePipes(ValidationPipe)
  googleSignIn(@Body() googleTokenDto: GoogleTokenDto) {
    return this.userService.googleSignIn(googleTokenDto);
  }

  @Patch('/:uid')
  @ApiOperation({ summary: '유저 정보 수정' })
  @UsePipes(ValidationPipe)
  updateUser(@Param('uid') uid: string, @Body('nickname') nickname: string) {
    return this.userService.updateUser(uid, nickname);
  }

  @Patch('/profile_image/:uid')
  @ApiOperation({ summary: '유저 프로필 이미지 수정 (TBD)' })
  @UsePipes(ValidationPipe)
  updateUserImage() {}

  @Delete('/:uid')
  @ApiOperation({ summary: '유저 삭제' })
  deleteUser(@Param('uid') uid: string) {
    return this.userService.deleteUser(uid);
  }

  @Get('/info')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({
    description: '유저 정보 반환',
    type: KakaoTokenDto,
  })
  getUserInfo(@Param('uid') uid: string) {
    return this.userService.getUserInfo(uid);
  }
}
