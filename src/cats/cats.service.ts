import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST, ModuleRef, ContextIdFactory } from '@nestjs/core';
import { Request } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly moduleRef: ModuleRef,
  ) {}

  async getCats(): Promise<string[]> {
    const contextId = ContextIdFactory.getByRequest(this.request);
    //作用域为REQUEST或者为TRANSIENT 需要动态获取类
    const logger = await this.moduleRef.resolve(LoggerService, contextId);
    logger.log(`Tenant: ${this.request.headers['x-tenant-id']} 请求了猫列表`); //请求态
    // const transientService = await this.moduleRef.resolve(TransientService); // 瞬态

    return ['Whiskers', 'Mittens'];
  }
}
