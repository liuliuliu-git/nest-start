import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private readonly timestamp = Date.now();

  log(message: string) {
    console.log(`[${this.timestamp}] LOG: ${message}`);
  }
}
