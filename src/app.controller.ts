import { Controller, Get, Param, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import getArchiveUrl from './helpers/getArchiveUrl';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/archive/*')
  async archiveWebsite(@Req() req: Request): Promise<string> {
    const archiveUrl = getArchiveUrl(req.url);
    return this.appService.archiveWebsite(archiveUrl);
  }

  @Get('/view/:timestamp/*')
  getArchive(
    @Param('timestamp') timestamp: string,
    @Req() req: Request,
  ): Promise<string> {
    const archiveUrl = getArchiveUrl(req.url);
    return this.appService.getArchive(timestamp, archiveUrl);
  }

  @Get('/allArchives')
  async getAllArchives(): Promise<string[]> {
    return this.appService.getAllArchives();
  }

  @Get('/allTimestamps/*')
  async getAllTimestamps(@Req() req: Request): Promise<string[]> {
    const archiveUrl = getArchiveUrl(req.url);
    return this.appService.getAllTimestamps(archiveUrl);
  }
}
