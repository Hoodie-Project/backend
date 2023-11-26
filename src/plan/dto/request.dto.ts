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
