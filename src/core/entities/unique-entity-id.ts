import { randomUUID } from 'crypto'

export class UniqueEntityID {
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

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
