import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'

@Injectable()
export class PrismaQuestionsCommentsRepository
  implements QuestionsCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(questionComments: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComments)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComments: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: questionComments.id.toString(),
      },
    })
  }

  async findByID(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!questionComment) {
      return null
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionsId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComment = await this.prisma.comment.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return questionComment.map(PrismaQuestionCommentMapper.toDomain)
  }
}
