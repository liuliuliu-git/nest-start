import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BullModule } from '@nestjs/bullmq';
import { QueueController } from './queue.controller';
import { QueueProcessor } from './queue.worker';

@Module({
  controllers: [AppController, QueueController],
  providers: [AppService, QueueProcessor],
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: { attempts: 3, backoff: 2000 },
    }),
    BullModule.registerQueue({ name: 'sakura' }),
  ],
})
export class AppModule {}
