import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { SUPABASE_CLIENT } from 'src/db/constant';

@Injectable()
export class AppService {
  constructor(@Inject(SUPABASE_CLIENT) private supabase) {}

  getHello(): string {
    return 'Hey the server is on!';
  }

  async archiveWebsite(website: string): Promise<string> {
    try {
      const timestamp = Date.now();
      const requestResult = (await axios.get(website)) as AxiosResponse;
      const htmlBody = requestResult.data;
      const dbResult = await this.supabase.from('archive').insert([
        {
          website,
          timestamp,
          htmlBody,
        },
      ]);
      console.log(dbResult);
      if (dbResult.error) {
        console.log(dbResult.error);
        throw new BadRequestException(dbResult.error);
      }
      return timestamp.toString();
    } catch (err) {
      console.log(err);
      return 'ERROR while fetching the website. Please try with another URL.';
    }
  }

  async getArchive(timestamp: string, website: string): Promise<string> {
    try {
      const { data, error } = await this.supabase
        .from('archive')
        .select(
          `
          htmlBody
          `,
        )
        .match({ website, timestamp });
      if (error) {
        throw new BadRequestException(error);
      }
      if (data.length === 0) {
        throw new NotFoundException(
          'We found nothing for this website at this timestamp. Try something else.',
        );
      }
      return data[0].htmlBody;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }

  async getAllArchives(): Promise<string[]> {
    return;
  }

  async getAllTimestamps(website: string): Promise<string[]> {
    return;
  }
}
