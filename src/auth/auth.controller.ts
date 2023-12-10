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
import { HoodieTokensReqDto } from './dto/request.dto';
import { HoodieAuthTokens } from '@src/common/types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  tokenValidation(@Body('idToken') idToken: string) {
    return this.authService.validateKakaoIdToken(idToken);
  }

  @Post()
  issueHoodieAccessToken(
    @Param() uidDto: UidReqDto,
    @Body() hoodieTokenDto: HoodieTokensReqDto,
  ): Promise<HoodieAuthTokens | string> {
    return this.authService.reIssueHoodieAccessToken(uidDto, hoodieTokenDto);
  }

  @Post()
  issueHoodieRefreshToken(
    @Param() uidDto: UidReqDto,
    @Body() hoodieTokenDto: HoodieTokensReqDto,
  ) {
    return this.authService.reIssueHoodieRefreshToken(uidDto, hoodieTokenDto);
  }
}
