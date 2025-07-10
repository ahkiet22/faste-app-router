import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import 'jest'
import '@testing-library/react'

jest.spyOn(console, 'warn').mockImplementation(() => {})

jest.spyOn(console, 'error').mockImplementation(() => {})
