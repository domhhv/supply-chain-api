import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainItem } from './entities/supply-chain-item.entity';
import { SupplyChainEvent } from './entities/supply-chain-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyChainItem, SupplyChainEvent])],
})
export class SupplyChainModule {}
