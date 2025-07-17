import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Keyv } from 'keyv';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async getCache(key: string): Promise<void> {
    return await this.cacheManager.get(key);
  }

  async deleteCache(key: string): Promise<boolean> {
    return await this.cacheManager.del(key);
  }

  async resetCache(): Promise<boolean> {
    return await this.cacheManager.clear();
  }

  storesCache(): Keyv[] {
    return this.cacheManager.stores;
  }
}
