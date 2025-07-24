import { Logger } from '@nestjs/common';
import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';

@QueueEventsListener('sakura')
export class SakuraEventsListener extends QueueEventsHost {
  logger = new Logger('QueueEvents');

  @OnQueueEvent('added')
  onAdded(job: { jobId: string; name: string }) {
    this.logger.log('Queue events added', job);
  }
}
