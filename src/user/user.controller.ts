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
import { KakaoTokenDto } from '@src/user/dto/kakao-token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  sayHello() {
    return {
      message: 'hello',
    };
  }

  @Post('/signin/kakao')
  @UsePipes(ValidationPipe)
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenDto) {
    return this.userService.kakaoSignIn(kakaoTokenDto);
  }

  @Post('/signout/kakao')
  kakaoSignOut(@Body('accessToken, uid') accessToken: string, uid: string) {
    return this.userService.kakaoSignOut(accessToken, uid);
  }

  @Patch('/:uid')
  @UsePipes(ValidationPipe)
  updateUser(@Param('uid') uid: string, @Body('nickname') nickname: string) {
    return this.userService.updateUser(uid, nickname);
  }

  @Patch('/profile_image/:uid')
  @UsePipes(ValidationPipe)
  updateUserImage() {}

  @Delete('/:uid')
  deleteUser(@Param('uid') uid: string) {
    return this.userService.deleteUser(uid);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createUser(@Body() testDto: TestDto) {
  //   this.userService.createUser(testDto);
  // }

  @Get('/info')
  getUserInfo(@Param('uid') uid: string) {
    return this.userService.getUserInfo(uid);
  }
}
