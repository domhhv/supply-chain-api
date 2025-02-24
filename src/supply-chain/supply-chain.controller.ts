import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { CreateSupplyChainEventDto } from './dto/create-supply-chain-event.dto';
import { CreateSupplyChainItemDto } from './dto/create-supply-chain-item.dto';
import { UpdateSupplyChainItemDto } from './dto/update-supply-chain-item.dto';
import { SupplyChainService } from './supply-chain.service';

@ApiTags('supply-chain')
@Controller('supply-chain')
export class SupplyChainController {
  constructor(private readonly service: SupplyChainService) {}

  @ApiOperation({ summary: 'Create a new supply chain item' })
  @ApiCreatedResponse({
    description: 'The item has been successfully created',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('items')
  createItem(@Body() dto: CreateSupplyChainItemDto) {
    return this.service.createItem(dto);
  }

  @ApiOperation({ summary: 'Update supply chain item reference data' })
  @ApiOkResponse({
    description: 'The item has been successfully updated',
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateSupplyChainItemDto) {
    return this.service.updateItem(id, dto);
  }

  @ApiOperation({ summary: 'Get all supply chain items' })
  @ApiOkResponse({
    description: 'List of all supply chain items',
  })
  @Get('items')
  getAllItems() {
    return this.service.getAllItems();
  }

  @ApiOperation({ summary: 'Add a new event to a supply chain item' })
  @ApiCreatedResponse({
    description: 'The event has been successfully created',
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('items/:id/events')
  addEvent(
    @Param('id') itemId: string,
    @Body() dto: CreateSupplyChainEventDto,
  ) {
    return this.service.addEvent(itemId, dto);
  }

  @ApiOperation({ summary: 'Query all events of a supply chain item' })
  @ApiOkResponse({
    description: 'List of all events of a supply chain item',
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @Get('items/:id/events')
  getEvents(@Param('id') itemId: string) {
    return this.service.getEvents(itemId);
  }

  @ApiOperation({ summary: 'Get the last event of a supply chain item' })
  @ApiOkResponse({
    description: 'The last event of a supply chain item',
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @Get('items/:id/events/last')
  getLastEvent(@Param('id') itemId: string) {
    return this.service.getLastEvent(itemId);
  }
}
