import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswerCaseRequest {
  questionId: string
  page: number
}
type FetchQuestionAnswerCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswerCase {
  constructor(private answerQuestion: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerCaseRequest): Promise<FetchQuestionAnswerCaseResponse> {
    const answers = await this.answerQuestion.findManyByQuestiondId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
