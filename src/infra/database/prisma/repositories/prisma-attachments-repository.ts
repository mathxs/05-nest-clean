import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'
import { AttachmentRepository } from '@/domain/forum/application/repositories/attachment-repository'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)
    await this.prisma.attachment.create({
      data,
    })
  }
}
