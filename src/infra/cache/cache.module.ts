import { Module } from '@nestjs/common'
import { EnvModule } from '../auth/env/env.module'
import { EnvService } from '../auth/env/env.service'

@Module({
  imports: [EnvModule],
  providers: [EnvService],
})
export class CacheModule {}
