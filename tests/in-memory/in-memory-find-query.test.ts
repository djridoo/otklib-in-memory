import { and, any, equals, less, match, greater, not, or, overlap } from '@otklib/db'
import { InMemoryFindQuery } from '../../src/query/in-memory/in-memory-find-query'

describe('InMemoryFindQuery', () => {
  test('query', async () => {
    const collection = [
      { id: 1, a: 'b', c: 'zzzdzzz', e: 'x', i: 'z', k: 'a', arr: ['a', 'b', 'c', 'd', 'e'] },
      { id: 2, a: 'b', c: 'zzzdzzz', e: 'g', i: 'a', k: 'a', arr: ['b', 'c', 'd', 'e', 'f'] },
      { id: 3, a: 'b', c: 'zzzdzzz', e: 'g', i: 'z', k: 'z', arr: ['c', 'd', 'e', 'f', 'g'] },
      { id: 4, a: 'b', c: 'zzzdzzz', e: 'g', i: 'z', k: 'a', arr: ['d', 'e', 'f', 'g', 'h'] },
      { id: 5, a: 'x', c: 'zzzdzzz', e: 'x', i: 'a', k: 'z', arr: ['e', 'f', 'g', 'h', 'i'] },
      { id: 6, a: 'b', c: 'zzzzzz', e: 'x', i: 'a', k: 'z', arr: ['f', 'g', 'h', 'i', 'j'] },
    ]

    const query = new InMemoryFindQuery(
      and(
        equals('a', 'b'),
        match('c', 'd'),
        or(
          not(any('e', ['f', 'g', 'h'])), //
          less('i', 'j'),
          greater('k', 'l'),
        ),
        overlap('arr', ['c', 'd', 'e']),
      ),
      collection,
    )

    const result = await query.execute()

    expect(result.map((row) => row.id)).toEqual([1, 2, 3])
  })
})
