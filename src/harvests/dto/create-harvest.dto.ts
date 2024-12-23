import { IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  seedType: string;

  @ApiProperty()
  @IsNotEmpty()
  fertilizer: string;
}