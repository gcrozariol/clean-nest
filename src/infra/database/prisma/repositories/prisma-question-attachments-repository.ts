import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findManyByQuestionId(questionId: string) {
    throw new Error('Method not implemented.')
  }

  async deleteManyByQuestionId(questionId: string) {
    throw new Error('Method not implemented.')
  }
}
