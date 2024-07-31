import { AttachmentRepository } from '@/domain/forum/application/repositories/attachment-repository'
import { Injectable } from '@nestjs/common'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaService } from '../prisma.service'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-repository-mapper'

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}
