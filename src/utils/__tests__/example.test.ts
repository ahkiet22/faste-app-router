import { describe } from '@jest/globals'


// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).not.toBe(4)
//   })

//   test('compare object', () => {
//     const obj: any = { name: 1 }
//     obj['value'] = 2
//     expect(obj).toEqual({ name: 1, value: 2 })
//   })

//   test('compare null', () => {
//     const abc = null
//     expect(abc).toBeNull() // expect(abc).toBe(null)
//     expect(abc).toBeDefined() // expect(abc).toBe(null)
//     expect(abc).toBeUndefined() // expect(abc).toBe(null)
//     expect(abc).toBeTruthy() // expect(abc).toBe(null)
//     expect(abc).toBeFalsy() // expect(abc).toBe(null)
//   })
// })

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
