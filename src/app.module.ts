import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CacheModule.register({
      isGlobal: true,
      max: 100,
      ttl: 0,
    }),
  ],
})
export class AppModule {}
