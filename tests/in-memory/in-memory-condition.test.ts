import { not, equals, or, and, match, less, greater, any, isNull } from '../../src/query/in-memory/in-memory-condition'

describe('In memory condition', () => {
  test('not', () => {
    const condition = not(equals('a', 'b'))
    expect(condition({ a: 'b' })).toBeFalsy()
    expect(condition({ a: 'c' })).toBeTruthy()
  })

  test('or', () => {
    const condition = or(
      equals('a', 'b'), //
      equals('z', 'x'),
    )
    expect(condition({ a: 'b' })).toBeTruthy()
    expect(condition({ z: 'x' })).toBeTruthy()
    expect(condition({ k: 'j' })).toBeFalsy()
  })

  test('and', () => {
    const condition = and(
      equals('a', 'b'),
      equals('z', 'x'), //
    )
    expect(condition({ a: 'b' })).toBeFalsy()
    expect(condition({ z: 'x' })).toBeFalsy()
    expect(condition({ a: 'b', z: 'x' })).toBeTruthy()
  })

  test('equals', () => {
    const condition = equals('a', 'b')
    expect(condition({ a: 'b' })).toBeTruthy()
    expect(condition({ b: 'a' })).toBeFalsy()
  })

  test('match', () => {
    const condition = match('a', 'b')
    expect(condition({ a: 'zxcbah' })).toBeTruthy()
    expect(condition({ a: 'zxceah' })).toBeFalsy()
  })

  test('less', () => {
    const condition = less('a', 'bcdef')
    expect(condition({ a: 'bcde' })).toBeTruthy()
    expect(condition({ a: 'abcdefg' })).toBeTruthy()
    expect(condition({ a: 'bcdefg' })).toBeFalsy()
    expect(condition({ a: 'bcdef' })).toBeFalsy()
  })

  test('greater', () => {
    const condition = greater('a', 'bcdef')
    expect(condition({ a: 'bcde' })).toBeFalsy()
    expect(condition({ a: 'abcdefg' })).toBeFalsy()
    expect(condition({ a: 'bcdefg' })).toBeTruthy()
    expect(condition({ a: 'bcdef' })).toBeFalsy()
  })

  test('any', () => {
    const condition = any('a', ['b', 'c', 'd'])
    expect(condition({ a: 'b' })).toBeTruthy()
    expect(condition({ a: 'c' })).toBeTruthy()
    expect(condition({ a: 'd' })).toBeTruthy()
    expect(condition({ a: 'e' })).toBeFalsy()
  })

  test('isNull', () => {
    const condition = isNull('a')
    expect(condition({ a: null })).toBeTruthy()
    expect(condition({ a: 'notnull' })).toBeFalsy()
  })
})
