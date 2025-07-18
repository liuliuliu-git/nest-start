import { AppService } from './app.service';
import {
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as process from 'node:process';

@Controller('file')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(`共上传了 ${files.length} 个文件`);
    files.forEach((file, i) => {
      console.log(`第 ${i + 1} 个文件名: ${file.originalname}`);
    });
  }

  @Get('download')
  getFile(): StreamableFile {
    // console.log(process.cwd());
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
