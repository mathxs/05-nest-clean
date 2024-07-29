import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comments'

export abstract class QuestionsCommentsRepository {
  abstract create(questionComments: QuestionComment): Promise<void>
  abstract delete(questionComments: QuestionComment): Promise<void>
  abstract findByID(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionsId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
}
