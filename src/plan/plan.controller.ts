import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { AuthGuard } from '@src/guards/auth.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CalendarReqDto,
  EventIdReqDto,
  EventReqDto,
  StartDateReqDto,
  UidReqDto,
} from './dto/request.dto';
import { EventResDto } from './dto/response.dto';

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: '이벤트 생성' })
  @ApiBody({ type: EventReqDto })
  @ApiOkResponse({ description: '이벤트 생성 성공' })
  @UseGuards(AuthGuard)
  async createEvent(
    @Param() uidReqDto: UidReqDto,
    @Body() eventReqDto: EventReqDto,
  ): Promise<void> {
    return this.planService.createEvent(uidReqDto, eventReqDto);
  }

  @Patch()
  @ApiOperation({ summary: '이벤트 수정' })
  @ApiBody({ description: '수정할 이벤트 내용', type: EventReqDto })
  @ApiOkResponse({ description: '이벤트 수정 성공' })
  @UseGuards(AuthGuard)
  async updateEvent(
    @Param() eventIdReqDto: EventIdReqDto,
    @Body() eventReqDto: EventReqDto,
  ): Promise<void> {
    return this.planService.updateEvent(eventIdReqDto, eventReqDto);
  }

  @Delete()
  @ApiOperation({ summary: '이벤트 삭제' })
  @ApiOkResponse({ description: '이벤트 삭제 성공' })
  @UseGuards(AuthGuard)
  async deleteEvent(@Param() eventIdReqDto: EventIdReqDto): Promise<void> {
    return this.planService.deleteEvent(eventIdReqDto);
  }

  @Get('/:event_id')
  @ApiOperation({ summary: '이벤트 반환' })
  @ApiOkResponse({ description: '이벤트 반환', type: EventResDto })
  @UseGuards(AuthGuard)
  async getEvent(@Param() eventIdReqDto: EventIdReqDto): Promise<EventResDto> {
    return this.planService.getEvent(eventIdReqDto);
  }

  @Get('/:uid')
  @ApiOperation({ summary: '월에 해당하는 모든 이벤트 반환' })
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async getEventsByMonth(
    @Param() uidReqDto: UidReqDto,
    @Body() startDateReqDto: StartDateReqDto,
  ): Promise<EventResDto[]> {
    return this.planService.getEventsByMonth(uidReqDto, startDateReqDto);
  }

  @Post('/calendar')
  @ApiOperation({})
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async createCalendar(
    @Param() uidReqDto: UidReqDto,
    @Body() calendarReqDto: CalendarReqDto,
  ): Promise<void> {
    return this.planService.createCalendar(uidReqDto, calendarReqDto);
  }
}
