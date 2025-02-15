import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private agregate: CustomAggregate // eslint-disable-line

  constructor(agregate: CustomAggregate) {
    this.agregate = agregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.agregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}

describe('DomainEvents', () => {
  test('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()
    // Subscriber cadastrado (ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma resposta porem sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado porem não foi disparado
    expect(aggregate.domainEvents.length).toBe(1)

    // Estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(callbackSpy).toHaveLength(0)
  })
})
