import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Slug } from './slug'
import { Attachment } from '../attachment'

export interface QuestionDetalisProps {
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId | null

  author: string
  title: string
  content: string

  createAt: Date
  updateAt?: Date | null

  slug: Slug

  attachments: Attachment[]
}

export class QuestionDetalis extends ValueObject<QuestionDetalisProps> {
  static create(props: QuestionDetalisProps) {
    return new QuestionDetalis(props)
  }

  get questionId() {
    return this.props.questionId
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get author() {
    return this.props.author
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get createAt() {
    return this.props.createAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
  }
}
