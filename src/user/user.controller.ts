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
import { KakaoTokenReqDto } from '@src/user/dto/request/kakao-req.dto';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { GoogleTokenReqDto } from './dto/request/google-req.dto';
import {
  AuthTokenResDto,
  KakaoSignOutResDto,
  UserInfoResDto,
} from './dto/response/response.dto';
import { KakaoSignOutReqDto } from '@src/user/dto/request/kakao-req.dto';
import { NicknameReqDto, UidReqDto } from './dto/request/user-req.dto';
import { AuthToken } from './types/user';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/kakao/signin')
  @ApiOperation({ summary: '카카오 로그인 / 자동 회원가입' })
  @ApiOkResponse({ description: '카카오 로그인 성공', type: AuthTokenResDto })
  @UsePipes(ValidationPipe)
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenReqDto): Promise<AuthToken> {
    return this.userService.kakaoSignIn(kakaoTokenDto);
  }

  @Post('/kakao/signout')
  @ApiOperation({ summary: '카카오 로그아웃' })
  @ApiOkResponse({
    description: '카카오 로그아웃 성공',
    type: KakaoSignOutResDto,
  })
  kakaoSignOut(@Body() kakaoSignOutDto: KakaoSignOutReqDto): Promise<string> {
    return this.userService.kakaoSignOut(kakaoSignOutDto);
  }

  @Post('/google/signin')
  @ApiOperation({ summary: '구글 로그인' })
  @ApiOkResponse({ description: '구글 로그인 성공', type: AuthTokenResDto })
  @UsePipes(ValidationPipe)
  googleSignIn(
    @Body() googleTokenDto: GoogleTokenReqDto,
  ): Promise<AuthTokenResDto> {
    return this.userService.googleSignIn(googleTokenDto);
  }

  // 구글 로그아웃

  @Patch('/:uid')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiOkResponse({ description: '유저 정보 수정 성공' })
  @UsePipes(ValidationPipe)
  updateUser(
    @Param() uidDto: UidReqDto,
    @Body() nicknameDto: NicknameReqDto,
  ): Promise<void> {
    return this.userService.updateUser(uidDto, nicknameDto);
  }

  @Patch('/profile_image/:uid')
  @ApiOperation({ summary: '유저 프로필 이미지 수정 (TBD)' })
  @UsePipes(ValidationPipe)
  updateUserImage() {}

  @Delete('/:uid')
  @ApiOperation({ summary: '유저 삭제' })
  @ApiOkResponse({ description: '유저 삭제 성공' })
  deleteUser(@Param() uidDto: UidReqDto): Promise<void> {
    return this.userService.deleteUser(uidDto);
  }

  @Get('/info')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({ description: '유저 정보 조회 성공', type: UserInfoResDto })
  getUserInfo(@Param() uidDto: UidReqDto): Promise<UserInfoResDto> {
    return this.userService.getUserInfo(uidDto);
  }
}
