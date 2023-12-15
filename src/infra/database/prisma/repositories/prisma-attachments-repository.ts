import { Injectable } from '@nestjs/common'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaService } from '../prisma.service'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(attachment: Attachment) {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({ data })
  }
}
