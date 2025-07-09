import { describe } from '@jest/globals'

// describe('number matchers', () => {
//   const value = 3
//   test('compare', () => {
//     expect(value).toBeGreaterThan(2.9) // >
//     expect(value).toBeGreaterThanOrEqual(3) // >=
//     expect(value).toBeLessThan(3.001) // <
//     expect(value).toBeLessThanOrEqual(3.001) // <=
//   })
//   test('float number', () => {
//     const value = 0.1 + 0.2
//     expect(value).toBeCloseTo(0.3)
//   })
// })

// describe('string matchers', () => {
//   test('testing string', () => {
//     expect('this is string').not.toMatch('value')
//   })
//   test('testing array', () => {
//     const arr = ['a', 'b', 'c']
//     expect(arr).toContain('a') // giống Array includes() trong array
//   })
// })
const throwError = () => {
  throw new Error('notify error')
}
describe('exception matchers', () => {
  test('testing error', () => {
    expect(throwError).toThrow()
    expect(throwError).toThrow('notify error2')
  })
})
