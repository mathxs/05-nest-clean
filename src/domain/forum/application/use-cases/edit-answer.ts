import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '../../enterprise/entities/answer-attchment'
import { Injectable } from '@nestjs/common'

interface EditAnswersUseCaseRequest {
  authorId: string
  answersId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answers: Answer
  }
>
@Injectable()
export class EditAnswersUseCase {
  constructor(
    private answerssRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answersId,
    content,
    attachmentsIds,
  }: EditAnswersUseCaseRequest): Promise<EditAnswersUseCaseResponse> {
    const answers = await this.answerssRepository.findById(answersId)

    if (!answers) {
      // throw new Error('Answers not found.')
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answers.authorId.toString()) {
      // throw new Error('Not allowed.')
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answersId)
    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answers.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answers.attachments = answerAttachmentList
    answers.content = content

    await this.answerssRepository.save(answers)

    return right({ answers })
  }
}
