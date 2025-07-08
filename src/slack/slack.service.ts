import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST }) // or Scope.TRANSIENT
export class SlackService {
  handle(payload: any) {
    return {
      message: 'Handled by SlackService',
      data: payload as Record<string, unknown>,
    };
  }
}
