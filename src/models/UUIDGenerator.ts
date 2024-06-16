export class UUIDGenerator {
  static create(): string {
    return crypto.randomUUID()
  }
}