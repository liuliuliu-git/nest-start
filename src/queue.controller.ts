import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('queue')
export class QueueController {
  constructor(@InjectQueue('sakura') private queue: Queue) {}

  @Post('upload')
  async process() {
    await this.queue.add('upload', {
      fileName: '333',
      fileType: 'text/plain',
    });
    return {
      message: 'Queue has been added upload work',
    };
  }

  @Post('compress')
  async compress() {
    await this.queue.add('compress', {
      fileName: '333',
      fileType: 'text/plain',
    });
    return {
      message: 'Queue has been added compress work',
    };
  }
}
