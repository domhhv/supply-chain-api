import { PartialType } from '@nestjs/swagger';

import { CreateSupplyChainItemDto } from './create-supply-chain-item.dto';

export class UpdateSupplyChainItemDto extends PartialType(
  CreateSupplyChainItemDto,
) {}
