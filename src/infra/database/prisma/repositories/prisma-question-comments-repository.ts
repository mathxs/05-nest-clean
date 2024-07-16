import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsCommentsRepository
  implements QuestionsCommentsRepository
{
  create(questionComments: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(questionComments: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findByID(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionsId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }
}
