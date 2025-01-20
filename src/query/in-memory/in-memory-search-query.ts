import { Query } from '@otklib/db'

export class InMemorySearchQuery<T extends object> implements Query {
  private readonly text: string = ''

  private readonly fields: string[] | null = null

  private readonly collection: T[]

  constructor(text: string, fields: string[] | null, collection: T[]) {
    this.text = text
    this.fields = fields
    this.collection = collection
  }

  public async execute(): Promise<T[]> {
    return this.collection.filter((row: T) => this.compareRow(row))
  }

  private compareRow(row: T): boolean {
    return Object.entries(row).some(([key, value]) => this.compareField(key, value as string))
  }

  private compareField(key: string, value: string): boolean {
    if (this.fields && !this.fields.includes(key)) return false
    return `${value || ''}`.includes(this.text)
  }
}
