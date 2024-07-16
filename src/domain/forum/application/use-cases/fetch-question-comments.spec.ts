import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryCommentRepository: InMemoryQuestionsCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryQuestionsCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryCommentRepository)
  })

  test('should be able to fetch recent comments', async () => {
    await inMemoryCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  test('should be able to fetch paginated recent comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
