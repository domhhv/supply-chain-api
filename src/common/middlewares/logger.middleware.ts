import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, url, body } = request;

    response.on('close', () => {
      const { statusCode } = response;

      const message = `${method} ${url} ${statusCode}`;

      if (Object.keys(body).length) {
        this.logger.log(`${message} ${JSON.stringify(body, null, 2)}`);

        return;
      }

      this.logger.log(message);
    });

    next();
  }
}
