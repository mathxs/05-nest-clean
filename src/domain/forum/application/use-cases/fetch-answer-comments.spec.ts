import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryCommentRepository: InMemoryAnswersCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryAnswersCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryCommentRepository)
  })

  test('should be able to fetch recent comments', async () => {
    await inMemoryCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )
    await inMemoryCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )
    await inMemoryCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  test('should be able to fetch paginated recent comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
