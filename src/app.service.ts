import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'App is operational. Navigate to /api to see the API documentation. Use /supply-chain prefix for all supply chain related endpoints.';
  }
}
