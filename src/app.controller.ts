import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '서버 연결 확인' })
  @ApiOkResponse({ description: 'Server connected' })
  getHello(): string {
    return this.appService.getHello();
  }
}
