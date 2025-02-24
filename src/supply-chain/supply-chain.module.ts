import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainItem } from './entities/supply-chain-item.entity';
import { SupplyChainEvent } from './entities/supply-chain-event.entity';
import { SupplyChainService } from './supply-chain.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyChainItem, SupplyChainEvent])],
  providers: [SupplyChainService],
})
export class SupplyChainModule {}
