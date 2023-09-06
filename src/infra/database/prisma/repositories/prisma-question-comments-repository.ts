import { Injectable } from '@nestjs/common'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async findManyByQuestionId(id: string, params: PaginationParams) {
    throw new Error('Method not implemented.')
  }

  async create(question: QuestionComment) {
    throw new Error('Method not implemented.')
  }

  async delete(questionComment: QuestionComment) {
    throw new Error('Method not implemented.')
  }
}
