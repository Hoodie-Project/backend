import { Injectable } from '@nestjs/common';
import { PlanRepository } from '@src/plan/plan.repository';
import {
  CalendarReqDto,
  EventIdReqDto,
  EventReqDto,
  StartDateReqDto,
  UidReqDto,
} from './dto/request.dto';
import { PlanEntity } from '@src/common/entity/plan.entity';
@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async createEvent(uidDto: UidReqDto, eventDto: EventReqDto): Promise<void> {
    const { title, content, start_date, end_date } = eventDto;

    const calendar = await this.planRepository.getCalendarByUID(uidDto.uid);

    if (calendar === null) {
      const defaultCalendar = await this.planRepository.createDefaultCalendar(
        uidDto.uid,
      );
      await this.planRepository.insertEvent(
        title,
        content,
        start_date,
        end_date,
        defaultCalendar,
      );
    }
  }

  async updateEvent(
    eventIdDto: EventIdReqDto,
    eventDto: EventReqDto,
  ): Promise<void> {
    const { title, content, start_date, end_date } = eventDto;
    return this.planRepository.updateEvent(
      parseInt(eventIdDto.event_id),
      title,
      content,
      start_date,
      end_date,
    );
  }

  async deleteEvent(eventIdDto: EventIdReqDto): Promise<void> {
    return this.planRepository.deleteEvent(parseInt(eventIdDto.event_id));
  }

  async getEvent(eventIdDto: EventIdReqDto): Promise<PlanEntity> {
    return this.planRepository.getEvent(parseInt(eventIdDto.event_id));
  }

  async getEventsByMonth(
    uidDto: UidReqDto,
    startDateDto: StartDateReqDto,
  ): Promise<PlanEntity[]> {
    const { start_date } = startDateDto;

    const month = start_date.getMonth() + 1;
    const year = start_date.getFullYear();
    const startDateOfMonth = new Date(year, month - 1, 1);
    const endDateOfMonth = new Date(year, month, 0, 23, 59, 59);

    return this.planRepository.getEventsByMonth(
      uidDto.uid,
      startDateOfMonth,
      endDateOfMonth,
    );
  }

  async createCalendar(
    uidDto: UidReqDto,
    calendarDto: CalendarReqDto,
  ): Promise<void> {
    const { name, color, description } = calendarDto;
    const calendar = await this.planRepository.getCalendarByUID(uidDto.uid);

    if (calendar === null) {
      await this.planRepository.createDefaultCalendar(uidDto.uid);
    }
    return await this.planRepository.insertCalendar(name, color, description);
  }
}
