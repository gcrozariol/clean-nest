import { UseCaseError } from '@/core/errors/use-case-error'

export class WrongCredentialdError extends Error implements UseCaseError {
  constructor() {
    super(`Invalid credentials.`)
  }
}
