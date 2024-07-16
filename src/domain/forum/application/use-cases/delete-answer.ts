import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findByID(answerId)
    if (!answer) {
      // throw new Error('Answer not found')
      return left(new ResourceNotFoundError())
    }
    if (answer.authorId.toString() !== authorId) {
      // throw new Error('Unauthorized')
      return left(new NotAllowedError())
    }
    await this.answerRepository.delete(answer)
    return right(null)
  }
}
