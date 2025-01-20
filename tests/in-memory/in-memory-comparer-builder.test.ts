import { and, any, equals, less, match, greater, not, or } from '@otklib/db'
import { InMemoryComparerBuilder } from '../../src/query/in-memory/in-memory-comparer-builder'

describe('InMemoryComparerBuilder', () => {
  test('compare', () => {
    const comparerBuilder = new InMemoryComparerBuilder(
      and(
        equals('a', 'b'),
        match('c', 'd'),
        or(
          not(any('e', ['f', 'g', 'h'])), //
          less('i', 'j'),
          greater('k', 'l'),
        ),
      ),
    )

    const compare = comparerBuilder.build()

    expect(compare({ a: 'b', c: 'zzzdzzz', e: 'x', i: 'z', k: 'a' })).toBeTruthy()
    expect(compare({ a: 'b', c: 'zzzdzzz', e: 'g', i: 'a', k: 'a' })).toBeTruthy()
    expect(compare({ a: 'b', c: 'zzzdzzz', e: 'g', i: 'z', k: 'z' })).toBeTruthy()

    expect(compare({ a: 'b', c: 'zzzdzzz', e: 'g', i: 'z', k: 'a' })).toBeFalsy()
    expect(compare({ a: 'x', c: 'zzzdzzz', e: 'x', i: 'a', k: 'z' })).toBeFalsy()
    expect(compare({ a: 'b', c: 'zzzzzz', e: 'x', i: 'a', k: 'z' })).toBeFalsy()
  })
})
