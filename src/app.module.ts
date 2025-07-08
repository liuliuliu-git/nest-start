import { Module } from '@nestjs/common';
import { WebhookController } from './webhook/webhook.controller';
import { SlackModule } from './slack/slack.module';
import { GithubModule } from './github/github.module';

@Module({
  controllers: [WebhookController],
  imports: [SlackModule, GithubModule],
})
export class AppModule {}
