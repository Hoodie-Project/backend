import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@src/auth/service/auth.service';
import { UidReqDto } from '@src/auth/dto/request.dto';
import { GenerateTokenReqDto } from './dto/request.dto';
import { AuthToken } from '@src/types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  tokenValidation(@Body('idToken') idToken: string) {
    return this.authService.validateKakaoIdToken(idToken);
  }

  // @Post()
  // generateAccessToken(
  //   @Param() uidDto: UidReqDto,
  //   @Body() generateTokenDto: GenerateTokenReqDto,
  // ): Promise<AuthToken | string> {
  //   return this.authService.generateHoodieTokens(uidDto, generateTokenDto);
  // }
}
