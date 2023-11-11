import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoogleUserService } from './google-user.service';
import { GoogleTokenDto } from './dto/google-token.dto';

@Controller('google')
export class GoogleUserController {
  constructor(private googleUserService: GoogleUserService) {}

  @Post('/signin')
  @UsePipes(ValidationPipe)
  googleSignIn(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleUserService.googleSignIn(googleTokenDto);
  }
}
