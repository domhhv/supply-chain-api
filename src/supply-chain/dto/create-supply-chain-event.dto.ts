import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSupplyChainEventDto {
  @ApiProperty({ description: 'Location of the event' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Custodian of the item at the event' })
  @IsNotEmpty()
  @IsString()
  custodian: string;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
