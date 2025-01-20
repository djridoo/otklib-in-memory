import { or, not, and, equals, match, less, greater, any, isNull, overlap } from './in-memory-condition'

export class InMemoryComparerBuilder {
  private fns = {
    or,
    not,
    and,
    equals,
    match,
    less,
    greater,
    any,
    isNull,
    overlap,
  }

  private ast

  constructor(ast) {
    this.ast = ast
  }

  public build() {
    const args = this.ast.args.map(this.parseArgument)
    return this.fns[this.ast.fn](...args)
  }

  private parseArgument(arg) {
    if (typeof arg === 'object' && 'fn' in arg && 'args' in arg) {
      const builder = new InMemoryComparerBuilder(arg)
      return builder.build()
    }
    return arg
  }
}
