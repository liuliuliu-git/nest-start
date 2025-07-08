import { Controller, Post, Body, Req, Inject } from '@nestjs/common';
import {
  ModuleRef,
  ContextIdFactory,
  REQUEST,
  LazyModuleLoader,
} from '@nestjs/core';

interface WebhookPayload {
  source: 'github' | 'slack';
  [key: string]: any;
}

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly lazyModuleLoader: LazyModuleLoader,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Post()
  async handleWebhook(@Body() body: WebhookPayload, @Req() request: Request) {
    const source = body.source;
    const contextId = ContextIdFactory.create();

    // 注册当前请求上下文
    this.moduleRef.registerRequestByContextId(request, contextId);

    let service: any;

    if (source === 'github') {
      const { GithubModule } = await import('../github/github.module');
      const moduleRef = await this.lazyModuleLoader.load(() => GithubModule);
      service = await moduleRef.resolve('GITHUB_SERVICE', contextId);
    } else if (source === 'slack') {
      const { SlackModule } = await import('../slack/slack.module');
      const moduleRef = await this.lazyModuleLoader.load(() => SlackModule);
      service = await moduleRef.resolve('SLACK_SERVICE', contextId);
    } else {
      return { message: 'Unknown source' };
    }

    return service.handle(body);
  }
}
