import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswersUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachmentes-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerssRepository: InMemoryAnswerRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswersUseCase

describe('Edit Answers', () => {
  beforeEach(() => {
    inMemoryAnswerssRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    sut = new EditAnswersUseCase(
      inMemoryAnswerssRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })

  test('should be able to Edit a answers', async () => {
    const newAnswers = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('123'),
    )
    await inMemoryAnswerssRepository.create(newAnswers)

    await inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswers.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswers.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      content: 'Conteúdo da pergunta teste',
      answersId: newAnswers.id.toValue(),
      attachmentsIds: ['1', '2'],
    })

    expect(inMemoryAnswerssRepository.items[0]).toMatchObject({
      content: 'Conteúdo da pergunta teste',
    })
    expect(
      inMemoryAnswerssRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryAnswerssRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })

  test('should not be able to Edit a answers from another user', async () => {
    const newAnswers = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answers-1'),
    )
    await inMemoryAnswerssRepository.create(newAnswers)
    const result = await sut.execute({
      answersId: newAnswers.id.toValue(),
      authorId: 'author-2',
      content: 'Conteúdo da pergunta teste',
      attachmentsIds: [],
    })
    expect(result.isRight()).toBe(false)
  })
})
