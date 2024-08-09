import { randomUUID } from 'crypto'

export class UniqueEntityId {
  private value: string
  // não entendi pq ele fez dois metodos iguais
  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: UniqueEntityId) {
    return id.toValue() === this.value
  }
}
