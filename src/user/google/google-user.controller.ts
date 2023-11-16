import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoogleUserService } from './google-user.service';
import { GoogleTokenDto } from './dto/google-token.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('google')
export class GoogleUserController {
  constructor(private googleUserService: GoogleUserService) {}

  @Post('/signin')
  @ApiOperation({ summary: '구글 로그인' })
  @ApiOkResponse({
    description: '구글 로그인 성공',
    type: GoogleTokenDto,
  })
  @UsePipes(ValidationPipe)
  googleSignIn(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleUserService.googleSignIn(googleTokenDto);
  }
}
