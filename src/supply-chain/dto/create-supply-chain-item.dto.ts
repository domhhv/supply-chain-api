import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateSupplyChainItemDto {
  @ApiProperty({ description: 'Name of the item' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Color of the item', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ description: 'Price of the item', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;
}
