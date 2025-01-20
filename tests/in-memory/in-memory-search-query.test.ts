import { InMemorySearchQuery } from '../../src/query/in-memory/in-memory-search-query'

describe('InMemorySearchQuery', () => {
  const collection = [
    { id: 1, a: 'aba', b: 'bac', c: 'xxx' },
    { id: 2, a: 'cab', b: 'aba', c: 'yyy' },
    { id: 3, a: 'xac', b: 'xxx', c: 'xyz' },
    { id: 4, a: 'xac', b: 'yyy', c: 'yxz' },
  ]

  test('search by specified fields', async () => {
    const query = new InMemorySearchQuery('b', ['a', 'b'], collection)
    const result = await query.execute()
    expect(result.map((row) => row.id)).toEqual([1, 2])
  })

  test('search by all fields', async () => {
    const query = new InMemorySearchQuery('z', null, collection)
    const result = await query.execute()
    expect(result.map((row) => row.id)).toEqual([3, 4])
  })
})
