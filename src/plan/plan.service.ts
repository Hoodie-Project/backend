import { Injectable } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import {
  EventIdReqDto,
  EventReqDto,
  StartDateReqDto,
  UidReqDto,
} from './dto/request.dto';
import { PlanEntity } from './entity/plan.entity';
@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async createEvent(eventDto: EventReqDto): Promise<void> {
    const { title, content, start_date, end_date } = eventDto;
    return this.planRepository.insertEvent(
      title,
      content,
      start_date,
      end_date,
    );
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
}
