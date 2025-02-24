import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SupplyChainService } from './supply-chain.service';
import { CreateSupplyChainItemDto } from './dto/create-supply-chain-item.dto';
import { UpdateSupplyChainItemDto } from './dto/update-supply-chain-item.dto';
import { CreateSupplyChainEventDto } from './dto/create-supply-chain-event.dto';

@ApiTags('supply-chain')
@Controller('supply-chain')
export class SupplyChainController {
  constructor(private readonly service: SupplyChainService) {}

  @ApiOperation({ summary: 'Create a new supply chain item' })
  @Post('items')
  createItem(@Body() dto: CreateSupplyChainItemDto) {
    return this.service.createItem(dto);
  }

  @ApiOperation({ summary: 'Update supply chain item reference data' })
  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateSupplyChainItemDto) {
    return this.service.updateItem(id, dto);
  }

  @ApiOperation({ summary: 'Add a new event to a supply chain item' })
  @Post('items/:id/events')
  addEvent(
    @Param('id') itemId: string,
    @Body() dto: CreateSupplyChainEventDto,
  ) {
    return this.service.addEvent(itemId, dto);
  }

  @ApiOperation({ summary: 'Query all events of a supply chain item' })
  @Get('items/:id/events')
  getEvents(@Param('id') itemId: string) {
    return this.service.getEvents(itemId);
  }

  @ApiOperation({ summary: 'Get the last event of a supply chain item' })
  @Get('items/:id/events/last')
  getLastEvent(@Param('id') itemId: string) {
    return this.service.getLastEvent(itemId);
  }
}
