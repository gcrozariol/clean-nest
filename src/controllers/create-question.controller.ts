import { z } from 'zod'
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from '@/auth/current-user-decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { UserPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

const bodyValidatitonPipe = new ZodValidationPipe(createQuestionBodySchema)
@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidatitonPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub
    const { title, content } = body

    const slug = this.convertToSlug(content)

    const slugExists = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (slugExists) {
      throw new ConflictException('Slug already exists.')
    }

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug,
        authorId: userId,
      },
    })
  }

  convertToSlug(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return slugText
  }
}
