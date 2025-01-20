import { Query, QueryAst } from '@otklib/db'
import { InMemoryComparerBuilder } from './in-memory-comparer-builder'

export class InMemoryFindQuery<T> implements Query {
  private readonly ast: QueryAst

  private readonly collection: T[]

  constructor(ast: QueryAst, collection: T[]) {
    this.ast = ast
    this.collection = collection
  }

  public async execute(): Promise<T[]> {
    const comparerBuilder = new InMemoryComparerBuilder(this.ast)
    const comparer = comparerBuilder.build()
    return this.collection.filter(comparer)
  }
}
