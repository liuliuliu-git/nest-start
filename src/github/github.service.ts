import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST }) // or Scope.TRANSIENT
export class GithubService {
  handle(payload: any) {
    return {
      message: 'Handled by GithubService',
      data: payload as Record<string, unknown>,
    };
  }
}
