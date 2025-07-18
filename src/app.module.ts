import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const originalName = file.originalname.replace(/\s+/g, '-');
          cb(null, `${timestamp}-${originalName}`);
        },
      }),
    }),
  ],
})
export class AppModule {}
