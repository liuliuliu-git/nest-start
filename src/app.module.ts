import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

import * as redisStore from 'cache-manager-ioredis';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CacheModule.register({
      isGlobal: true, // 👈 全局注册
      host: 'localhost', // 你的 Redis 容器地址
      port: 6379,
      ttl: 0,
      store: redisStore,
    }),
    UserModule,
  ],
})
export class AppModule {}
