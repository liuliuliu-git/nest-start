import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('sakura', { concurrency: 2 })
export class QueueProcessor extends WorkerHost {
  async process(job: Job) {
    const totalStep = 5;
    switch (job.name) {
      case 'upload':
        console.log('Start upload task');
        await this.runTask(job, totalStep);
        break;
      case 'compress':
        console.log('Start compress task');
        await this.runTask(job, totalStep);
        break;
      default:
        console.log(`Unknown job ${job.name}`);
        break;
    }
  }

  async runTask(job: Job, totalStep: number): Promise<void> {
    for (let step = 1; step <= totalStep; step++) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const progress = Math.round((step / totalStep) * 100);
      await job.updateProgress(progress);
    }
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    console.log(`job id ${job.id} , ${job.progress as number}% completed`);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`Processing queue...,${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Queue ${job.id} be completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Queue ${job.id} failed`);
    console.log(`Attempt number ${job.attemptsMade} `);
  }
}
