import { hash, compare } from 'bcryptjs'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENTH = 8

  hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENTH)
  }

  compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
