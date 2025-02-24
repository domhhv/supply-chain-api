import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupplyChainEvent } from './entities/supply-chain-event.entity';
import { SupplyChainItem } from './entities/supply-chain-item.entity';
import { SupplyChainController } from './supply-chain.controller';
import { SupplyChainService } from './supply-chain.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyChainItem, SupplyChainEvent])],
  controllers: [SupplyChainController],
  providers: [SupplyChainService],
  exports: [SupplyChainService],
})
export class SupplyChainModule {}
