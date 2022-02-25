import { SUPABASE_CLIENT } from './constant';
import { Module, DynamicModule, Provider } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Module({})
export class SupabaseModule {
  static forRoot(URL: string, KEY: string): DynamicModule {
    const supabase = createClient(URL, KEY);

    const supabaseProvider: Provider = {
      provide: SUPABASE_CLIENT,
      useValue: supabase,
    };

    return {
      module: SupabaseModule,
      providers: [supabaseProvider],
      exports: [supabaseProvider],
      global: true,
    };
  }
}
