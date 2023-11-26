import { Injectable } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { EventIdReqDto, EventReqDto } from './dto/request.dto';
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
    eventDto: EventReqDto,
    eventIdDto: EventIdReqDto,
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

  async getEvent() {}
  async getAllEvents() {}
}
