import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const newNotification = Notification.create(
    {
      title: faker.lorem.sentence(4),
      recipientId: new UniqueEntityId(),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return newNotification
}
