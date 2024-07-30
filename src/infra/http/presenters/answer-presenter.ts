import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerPresenter {
  static toHTTP(answer: Answer) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      createAt: answer.createdAt,
      updatedAt: answer.updateAt,
    }
  }
}
