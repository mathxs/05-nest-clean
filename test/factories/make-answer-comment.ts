import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comments'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment-mapper'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaAnswerComment(
    data: Partial<AnswerCommentProps> = {},
  ): Promise<AnswerComment> {
    const answercomment = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answercomment),
    })

    return answercomment
  }
}
