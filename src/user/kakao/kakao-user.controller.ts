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

@Controller('user')
export class KakaoUserController {
  constructor(private readonly kakaoUserService: KakaoUserService) {}

  @Get('/hello')
  sayHello() {
    return {
      message: 'hello',
    };
  }

  @Post('/signin/kakao')
  @UsePipes(ValidationPipe)
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenDto) {
    return this.kakaoUserService.kakaoSignIn(kakaoTokenDto);
  }

  @Post('/signout/kakao')
  kakaoSignOut(@Body('accessToken, uid') accessToken: string, uid: string) {
    return this.kakaoUserService.kakaoSignOut(accessToken, uid);
  }

  @Patch('/:uid')
  @UsePipes(ValidationPipe)
  updateUser(@Param('uid') uid: string, @Body('nickname') nickname: string) {
    return this.kakaoUserService.updateUser(uid, nickname);
  }

  @Patch('/profile_image/:uid')
  @UsePipes(ValidationPipe)
  updateUserImage() {}

  @Delete('/:uid')
  deleteUser(@Param('uid') uid: string) {
    return this.kakaoUserService.deleteUser(uid);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createUser(@Body() testDto: TestDto) {
  //   this.kakaoUserService.createUser(testDto);
  // }

  @Get('/info')
  getUserInfo(@Param('uid') uid: string) {
    return this.kakaoUserService.getUserInfo(uid);
  }
}
