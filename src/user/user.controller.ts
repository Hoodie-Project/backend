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
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { KakaoTokenReqDto } from '@src/user/dto/request/kakao-req.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { GoogleTokenReqDto } from './dto/request/google-req.dto';
import {
  AuthTokenResDto,
  KakaoSignOutResDto,
  UserInfoResDto,
} from './dto/response/response.dto';
import { KakaoSignOutReqDto } from '@src/user/dto/request/kakao-req.dto';
import { NicknameReqDto, UidReqDto } from './dto/request/user-req.dto';
import { HoodieAuthTokens } from '../common/types/user';
import { AuthGuard } from '@src/common/guard/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/kakao/signin')
  @ApiOperation({ summary: '카카오 로그인 / 자동 회원가입' })
  @ApiBody({ description: '카카오 토큰 객체', type: KakaoTokenReqDto })
  @ApiOkResponse({
    description: '엑세스 토큰과 리프레시 토큰 반환',
    type: AuthTokenResDto,
  })
  @UsePipes(ValidationPipe)
  kakaoSignIn(
    @Body() kakaoTokenDto: KakaoTokenReqDto,
  ): Promise<HoodieAuthTokens> {
    return this.userService.kakaoSignIn(kakaoTokenDto);
  }

  @Post('/kakao/token')
  @ApiOperation({ summary: '엑세스 토큰 재발급' })
  @ApiBody({})
  @ApiOkResponse({})
  @UsePipes(ValidationPipe)
  kakaoRegenerateToken() {}

  @Post('/kakao/signout')
  @ApiOperation({ summary: '카카오 로그아웃' })
  @ApiBody({ description: '엑세스 토큰과 유저 번호', type: KakaoSignOutReqDto })
  @ApiOkResponse({
    description: '로그아웃된 유저 번호 반환',
    type: KakaoSignOutResDto,
  })
  kakaoSignOut(@Body() kakaoSignOutDto: KakaoSignOutReqDto): Promise<string> {
    return this.userService.kakaoSignOut(kakaoSignOutDto);
  }

  @Post('/google/signin')
  @ApiOperation({ summary: '구글 로그인 / 자동 회원가입' })
  @ApiBody({ description: '구글 토큰 객체', type: GoogleTokenReqDto })
  @ApiOkResponse({
    description: '엑세스 토큰과 리프레시 토큰 반환',
    type: AuthTokenResDto,
  })
  @UsePipes(ValidationPipe)
  googleSignIn(@Body() googleTokenDto: GoogleTokenReqDto) {
    return this.userService.googleSignIn(googleTokenDto);
  }

  // 구글 로그아웃

  @Patch('/:uid')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiParam({ name: 'uid', type: UidReqDto })
  @ApiBody({ description: '닉네임', type: NicknameReqDto })
  @ApiOkResponse({ description: '유저 정보 수정 성공' })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(
    @Param() uidDto: UidReqDto,
    @Body() nicknameDto: NicknameReqDto,
  ): Promise<void> {
    return this.userService.updateUser(uidDto, nicknameDto);
  }

  @Patch('/profile_image/:uid')
  @ApiOperation({ summary: '유저 프로필 이미지 수정 (TBD)' })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateUserImage() {}

  @Delete('/:uid')
  @ApiOperation({ summary: '유저 삭제' })
  @ApiParam({ name: 'uid', type: UidReqDto })
  @UseGuards(AuthGuard)
  deleteUser(@Param() uidDto: UidReqDto): Promise<void> {
    return this.userService.deleteUser(uidDto);
  }

  @Get('/info/:uid')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiParam({ name: 'uid', type: UidReqDto })
  @ApiOkResponse({ description: '유저 정보 조회 성공', type: UserInfoResDto })
  @UseGuards(AuthGuard)
  getUserInfo(@Param() uidDto: UidReqDto): Promise<UserInfoResDto> {
    return this.userService.getUserInfo(uidDto);
  }
}
