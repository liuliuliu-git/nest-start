import { Module } from '@nestjs/common';
import { GithubService } from './github.service';

@Module({
  providers: [
    {
      provide: 'GITHUB_SERVICE',
      useClass: GithubService,
    },
  ],
  exports: ['GITHUB_SERVICE'],
})
export class GithubModule {}
