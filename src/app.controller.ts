import { AppService } from './app.service';
import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

interface KeyvStoreEntry {
  key: string;
  value: any;
}

interface StoreWithMap {
  _store: Map<string, { value: any }>;
}

@Controller('cache')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async setCacheKey(
    @Query('key') key: string,
    @Query('value') value: string,
  ): Promise<any> {
    console.log('Received POST /cache with:', { key, value });
    await this.appService.setCache(key, value);
    return {
      success: true,
      statusCode: 201,
      message: `Cached key ${key} successfully!`,
    };
  }

  @Get('/get/:key')
  async getCacheKey(@Param('key') key: string): Promise<any> {
    console.log('Received GET GET /cache with:', { key });
    const data = await this.appService.getCache(key);
    console.log('Received GET data', data);
    return {
      success: true,
      data,
      statusCode: 200,
    };
  }

  @Delete('/delete/:key')
  async deleteCache(@Param('key') key: string): Promise<any> {
    console.log('Received DELETE GET /cache with:', { key });
    const data = await this.appService.deleteCache(key);
    console.log('Received DELETE data', data);
  }

  @Get('/reset')
  async resetCache(): Promise<any> {
    const data = await this.appService.resetCache();
    console.log('Received GET data', data);
  }

  //基于内存场景下的 _store 快速读取
  @Get('/getAll')
  getAllCache(): { success: boolean; data: KeyvStoreEntry[] } {
    const stores = this.appService.storesCache();
    const result: KeyvStoreEntry[] = [];

    for (const store of stores) {
      // console.log(store);
      const keyvStore = (store as unknown as StoreWithMap)._store;
      // console.log('Getting data', keyvStore);
      if (keyvStore instanceof Map) {
        // console.log(Array.from(keyvStore.entries()));
        for (const [key, storedValue] of keyvStore.entries()) {
          // console.log(key, value);
          const pureKey = key.replace(/^keyv:/, '');
          result.push({
            key: pureKey,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: storedValue?.value,
          });
        }
      }
    }

    return {
      success: true,
      data: result,
    };
  }
}
