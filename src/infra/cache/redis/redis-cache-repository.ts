import { Injectable } from '@nestjs/common'
import { CacheRepository } from '../cache-repository'
import { RedisService } from './redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(private readonly redis: RedisService) {}

  async set(key: string, value: string) {
    await this.redis.set(key, value, 'EX', 60 * 15) // keep cache for 15 minutes
  }

  async get(key: string) {
    return await this.redis.get(key)
  }

  async delete(key: string) {
    await this.redis.del(key)
  }
}
