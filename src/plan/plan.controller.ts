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
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  EventIdReqDto,
  EventReqDto,
  EventsByMonthReqDto,
} from './dto/request.dto';
import { EventResDto } from './dto/response.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({})
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async createEvent(@Body() eventReqDto: EventReqDto): Promise<void> {
    return this.planService.createEvent(eventReqDto);
  }

  @Patch()
  @ApiOperation({})
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async updateEvent(
    @Param() eventIdReqDto: EventIdReqDto,
    @Body() eventReqDto: EventReqDto,
  ): Promise<void> {
    return this.planService.updateEvent(eventReqDto, eventIdReqDto);
  }

  @Delete()
  @ApiOperation({})
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async deleteEvent(@Param() eventIdReqDto: EventIdReqDto): Promise<void> {
    return this.planService.deleteEvent(eventIdReqDto);
  }

  @Get()
  @ApiOperation({})
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async getEvent(@Param() eventIdReqDto: EventIdReqDto): Promise<EventResDto> {
    return this.planService.getEvent(eventIdReqDto);
  }

  @Get()
  @ApiOperation({})
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async getEventsByMonth(
    @Param() eventsByMonthReqDto: EventsByMonthReqDto,
  ): Promise<EventResDto[]> {
    return this.planService.getEventsByMonth(eventsByMonthReqDto);
  }
}
