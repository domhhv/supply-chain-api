import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

import { CreateSupplyChainEventDto } from '../src/supply-chain/dto/create-supply-chain-event.dto';
import { CreateSupplyChainItemDto } from '../src/supply-chain/dto/create-supply-chain-item.dto';
import { UpdateSupplyChainItemDto } from '../src/supply-chain/dto/update-supply-chain-item.dto';

new CreateSupplyChainItemDto();
new UpdateSupplyChainItemDto();
new CreateSupplyChainEventDto();

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const outputDir = path.resolve(__dirname, '../schemas');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const outputPath = path.join(outputDir, 'dto-schemas.json');
fs.writeFileSync(outputPath, JSON.stringify(schemas, null, 2));

console.log(`JSON schemas generated successfully at ${outputPath}`);
