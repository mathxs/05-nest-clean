import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionsCommentsRepository {
  create(questionComments: QuestionComment): Promise<void>
  delete(questionComments: QuestionComment): Promise<void>
  findByID(id: string): Promise<QuestionComment | null>
  findManyByQuestionsId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
}
