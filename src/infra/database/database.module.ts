import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
// import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
// import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'

import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
// import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comment-repository'
// import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    // PrismaQuestionCommentsRepository,
    // PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    // PrismaAnswerCommentsRepository,
    // PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    // PrismaQuestionCommentsRepository,
    // PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    // PrismaAnswerCommentsRepository,
    // PrismaAnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
