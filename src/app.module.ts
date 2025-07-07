import { Module } from '@nestjs/common';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { LoggerService } from './logger/logger.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, LoggerService],
})
export class AppModule {}
