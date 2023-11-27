import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { PlanEntity } from './entity/plan.entity';
import { CalendarEntity } from './entity/calendar.entity';

@Injectable()
export class PlanRepository {
  private planRepository: Repository<PlanEntity>;
  private calendarRepository: Repository<CalendarEntity>;

  constructor(private dataSource: DataSource) {
    this.planRepository = this.dataSource.getRepository(PlanEntity);
    this.calendarRepository = this.dataSource.getRepository(CalendarEntity);
  }

  async insertEvent(
    title: string,
    content: string,
    start_date: Date,
    end_date: Date,
    calendar: CalendarEntity,
  ): Promise<void> {
    await this.planRepository.save({
      title,
      content,
      start_date,
      end_date,
      calendar,
    });
  }

  async updateEvent(
    event_id: number,
    title: string,
    content: string,
    start_date: Date,
    end_date: Date,
  ): Promise<void> {
    await this.planRepository.update(
      { id: event_id },
      { title, content, start_date, end_date },
    );
  }

  async deleteEvent(event_id: number): Promise<void> {
    await this.planRepository.delete({ id: event_id });
  }

  async getEvent(event_id: number): Promise<PlanEntity> {
    return await this.planRepository.findOne({ where: { id: event_id } });
  }

  async getEventsByMonth(
    uid: string,
    startDateOfMonth: Date,
    endDateOfMonth: Date,
  ): Promise<PlanEntity[]> {
    return await this.planRepository.find({
      where: {
        account: { uid },
        start_date: Between(startDateOfMonth, endDateOfMonth),
      },
    });
  }

  async getCalendarByUID(uid: string) {
    // await this.calendarRepository.find({
    //   where: { account: { uid } },
    // });
  }

  async insertCalendar(
    name: string,
    color: string,
    description: string,
  ): Promise<void> {
    await this.calendarRepository.save({
      name,
      color,
      description,
    });
  }

  async createDefaultCalendar(uid: string) {
    return await this.calendarRepository.save({
      name: '새캘린더',
      color: 'purple',
      description: null,
    });
  }
}
