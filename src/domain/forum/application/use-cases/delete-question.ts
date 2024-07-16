import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}
type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findByID(questionId)
    if (!question) {
      // throw new Error('Question not found')
      return left(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      // throw new Error('Unauthorized')
      return left(new NotAllowedError())
    }
    await this.questionRepository.delete(question)
    return right(null)
  }
}
