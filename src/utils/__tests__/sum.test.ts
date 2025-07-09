import { describe, expect, test } from '@jest/globals'
import { sum } from '../date'

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).not.toBe(4)
  })

  test('compare object', () => {
    const obj: any = { name: 1 }
    obj['value'] = 2
    expect(obj).toEqual({ name: 1, value: 2 })
  })

  test('compare null', () => {
    const abc = null
    expect(abc).toBeNull() // expect(abc).toBe(null)
    expect(abc).toBeDefined() // expect(abc).toBe(null)
    expect(abc).toBeUndefined() // expect(abc).toBe(null)
    expect(abc).toBeTruthy() // expect(abc).toBe(null)
    expect(abc).toBeFalsy() // expect(abc).toBe(null)
  })
})
