import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { KakaoTokenDto } from './dto/kakao-token.dto';
import { TestDto } from './dto/user-profile.dto';

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
  kakaoSignIn(@Body() kakaoTokenDto: KakaoTokenDto) {
    console.log('first', kakaoTokenDto);
    const { idToken, accessToken } = kakaoTokenDto;
    try {
      this.userService.kakaoSignIn(kakaoTokenDto);
      // const { validatedIdToken }
      //   this.authService.validateKakaoIdToken(idToken);

      return {
        idToken: idToken,
        accessToken: accessToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('/:uid')
  updateUser(@Param() uid: string, @Body() nickname: string) {
    return this.userService.updateUser(uid, nickname);
    // return 'Nickname has been updated';
  }

  @Patch('/profile_image/:uid')
  updateUserImage() {}

  @Delete('/:uid')
  deleteUser(@Param() uid: string) {
    this.userService.deleteUser(uid);
    return 'User has been deleted';
  }

  @Post()
  createUser(@Body() testDto: TestDto) {
    this.userService.createUser(testDto);
  }
}
