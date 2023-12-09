import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { CalendarEntity } from '@src/common/entity/calendar.entity';
import { PlanRevisionEntity } from '@src/common/entity/plan-revision.entity';
import { PlanEntity } from '@src/common/entity/plan.entity';
import { RecurrenceEntity } from '@src/common/entity/recurrence.entity';

export class EventResDto extends PlanEntity {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  calendar: CalendarEntity;

  @ApiProperty()
  @IsNotEmpty()
  recurrence: RecurrenceEntity[];

  @ApiProperty()
  planRevision: PlanRevisionEntity[];
}
