import { QuestionDetalis } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionsDetails: QuestionDetalis) {
    return {
      questionId: questionsDetails.questionId.toString(),
      authorId: questionsDetails.authorId.toString(),
      author: questionsDetails.author,
      title: questionsDetails.title,
      content: questionsDetails.content,
      slug: questionsDetails.slug.value,
      bestAnswerId: questionsDetails.bestAnswerId?.toString(),
      createdAt: questionsDetails.createAt,
      updatedAt: questionsDetails.updateAt,
      attachment: questionsDetails.attachments.map(AttachmentPresenter.toHTTP),
    }
  }
}
