import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionDetalis } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

type PrismaQuestionWithAuthor = PrismaQuestion & {
  author: PrismaUser
  attachment: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionWithAuthor): QuestionDetalis {
    return QuestionDetalis.create({
      questionId: new UniqueEntityId(raw.id),
      authorId: new UniqueEntityId(raw.author.id),
      author: raw.author.name,
      title: raw.title,
      slug: Slug.create(raw.slug),
      createAt: raw.createdAt,
      updateAt: raw.updatedAt,
      content: raw.content,
      attachments: raw.attachment.map(PrismaAttachmentMapper.toDomain),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityId(raw.bestAnswerId)
        : null,
    })
  }
}
