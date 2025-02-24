import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  price?: number;
}
