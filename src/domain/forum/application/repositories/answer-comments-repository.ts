import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentsRepository {
  create(answerComments: AnswerComment): Promise<void>
  delete(answerComments: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswersId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
}
