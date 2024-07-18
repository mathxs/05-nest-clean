import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(answerComments: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComments)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answerComments: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answerComments.id.toString(),
      },
    })
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!answerComment) {
      return null
    }

    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async findManyByAnswersId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComment = await this.prisma.comment.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return answerComment.map(PrismaAnswerCommentMapper.toDomain)
  }
}
