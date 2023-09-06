import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async findManyByQuestionId(questionId: string, params: PaginationParams) {
    throw new Error('Method not implemented.')
  }

  async create(answer: Answer) {
    throw new Error('Method not implemented.')
  }

  async delete(answer: Answer) {
    throw new Error('Method not implemented.')
  }

  async save(answer: Answer) {
    throw new Error('Method not implemented.')
  }
}
