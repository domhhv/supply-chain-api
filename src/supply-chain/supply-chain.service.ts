import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSupplyChainEventDto } from './dto/create-supply-chain-event.dto';
import { CreateSupplyChainItemDto } from './dto/create-supply-chain-item.dto';
import { UpdateSupplyChainItemDto } from './dto/update-supply-chain-item.dto';
import { SupplyChainEvent } from './entities/supply-chain-event.entity';
import { SupplyChainItem } from './entities/supply-chain-item.entity';

@Injectable()
export class SupplyChainService {
  constructor(
    @InjectRepository(SupplyChainItem)
    private readonly itemRepository: Repository<SupplyChainItem>,
    @InjectRepository(SupplyChainEvent)
    private readonly eventRepository: Repository<SupplyChainEvent>,
  ) {}

  async createItem(dto: CreateSupplyChainItemDto): Promise<SupplyChainItem> {
    const item = this.itemRepository.create(dto);

    return this.itemRepository.save(item);
  }

  async updateItem(
    id: string,
    dto: UpdateSupplyChainItemDto,
  ): Promise<SupplyChainItem> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    Object.assign(item, dto);

    return this.itemRepository.save(item);
  }

  async addEvent(
    itemId: string,
    dto: CreateSupplyChainEventDto,
  ): Promise<SupplyChainEvent> {
    const item = await this.itemRepository.findOneBy({ id: itemId });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const event = this.eventRepository.create({ ...dto, item });

    return this.eventRepository.save(event);
  }

  async getEvents(itemId: string): Promise<SupplyChainEvent[]> {
    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['events'],
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return item.events;
  }

  async getLastEvent(itemId: string): Promise<SupplyChainEvent | null> {
    const events = await this.eventRepository.find({
      where: { item: { id: itemId } },
      order: { createdAt: 'DESC' },
      take: 1,
    });

    return events[0] || null;
  }
}
