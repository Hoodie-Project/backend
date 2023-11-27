import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class EventReqDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  end_date: Date;
}

export class EventIdReqDto {
  @ApiProperty()
  @IsString()
  event_id: string;
}

export class StartDateReqDto {
  @ApiProperty()
  @IsDate()
  start_date: Date;
}

export class UidReqDto {
  @ApiProperty()
  @IsDate()
  uid: string;
}

export class CalendarReqDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  description: string;
}
