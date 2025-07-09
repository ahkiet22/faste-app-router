import { formatDate, getTimePast } from '../date'

describe('date utils', () => {
  describe('getTimePast()', () => {
    test('should return recently', () => {
      const t = (key: string) => key
      const recentlyInput = new Date(Date.now() - 1000 * 60 * 60) // date now - 1 hours
      expect(getTimePast(recentlyInput, t)).toBe('Recently')
    })

    test('should return day values', () => {
      const t = (key: string) => key
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 day
      expect(getTimePast(pastDate, t)).toBe('3 day')
    })

    test('should return months values', () => {
      const t = (key: string) => key
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 60) // 60 day
      expect(getTimePast(pastDate, t)).toBe('2 month')
    })

    test('should return year values', () => {
      const t = (key: string) => key
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2) // 2 year
      expect(getTimePast(pastDate, t)).toBe('2 year')
    })
  })

  describe('formatDate()', () => {
    test('test formatting default', () => {
      const input = new Date('2024-7-15')
      expect(formatDate(input)).toBe('15/7/2024')
    })

    test('test custom formatting', () => {
      const input = new Date('2024-7-15')
      const formatting: any = { month: 'long', day: 'numeric', year: 'numeric' }
      expect(formatDate(input, formatting)).toBe('15 tháng 7, 2024')
    })
  })
})
