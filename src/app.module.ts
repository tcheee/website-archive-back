import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './db/db.module';

@Module({
  imports: [
    SupabaseModule.forRoot(process.env.SUPABASE_URL, process.env.SUPABASE_KEY),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
