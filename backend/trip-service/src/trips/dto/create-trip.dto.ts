import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTripDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  destination!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}