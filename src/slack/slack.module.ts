import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';

@Module({
  providers: [
    {
      provide: 'SLACK_SERVICE',
      useClass: SlackService,
    },
  ],
  exports: ['SLACK_SERVICE'],
})
export class SlackModule {}
