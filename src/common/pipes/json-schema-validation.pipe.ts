import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import Ajv from 'ajv';

import * as schemas from '../../../schemas/dto-schemas.json';

@Injectable()
export class JsonSchemaValidationPipe implements PipeTransform {
  private ajv = new Ajv();

  transform(value: any, metadata: ArgumentMetadata) {
    const schema = schemas[metadata.metatype.name];

    if (schema) {
      const validate = this.ajv.compile(schema);

      if (!validate(value)) {
        throw new BadRequestException(validate.errors);
      }
    }

    return value;
  }
}
