import { fireEvent, screen, waitFor } from '@testing-library/react'
import LoginPage from 'src/views/pages/login'
import renderWithProvider from 'src/utils/jest-utils'
import { ROUTE_CONFIG } from 'src/configs/route'

const mockLogin = jest.fn()
const mockLoginGoogle = jest.fn()
const mockRouter = jest.fn()

let dataSession: any = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { username: 'admin' }
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: () => {
      language: 'en'
    }
  }),
  I18nextProvider: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    loginGoogle: mockLoginGoogle,
    loginFacebook: jest.fn()
  })
}))
jest.mock('react-redux')
jest.mock('next/navigation', () => {
  useRouter: () => {
    push: mockRouter
  }
})
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: dataSession,
    status: 'authenticated'
  }),
  signIn: jest.fn()
}))

describe('Login Page', () => {
  const renderComponent = () => {
    renderWithProvider(<LoginPage />)
  }
  test('render correct login page', async () => {
    renderComponent()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter_email')).toBeInTheDocument()
    expect(screen.getByText('Forgot_password')).toBeInTheDocument()
  })

  test('validate form when empty', async () => {
    renderComponent()
    const btnLogin = screen.getByText('Sign In')
    const inputEmail = screen.getByPlaceholderText('Enter_email')
    fireEvent.change(inputEmail, { target: { value: 'email@gmail.com' } })
    fireEvent.click(btnLogin)
    await waitFor(() => {
      expect(screen.getByText('Required_field')).toBeInTheDocument()
    })
  })

  test('Login success with email, password', async () => {
    const email = 'email@gmail.com'
    const password = '123456aA@'
    renderComponent()
    const btnLogin = screen.getByText('Sign In')
    const inputEmail = screen.getByPlaceholderText('Enter_email')
    const inputPassword = screen.getByPlaceholderText('Confirm_password')
    fireEvent.change(inputPassword, { target: { value: password } })
    fireEvent.change(inputEmail, { target: { value: email } })
    fireEvent.click(btnLogin)
    await waitFor(() => {
      expect(screen.queryByText('Required_field')).not.toBeInTheDocument()
      expect(mockLogin).toHaveBeenCalledWith(
        {
          email,
          password,
          rememberMe: true,
          deviceToken: ''
        },
        expect.any(Function)
      )
    })
  })

  test('Login success with google', async () => {
    const token = 'jdhakhdskhskvd'
    const provider = 'google'
    dataSession = {
      ...dataSession,
      accessToken: token,
      provider
    }
    renderComponent()
    const btnLogin = screen.getByTestId('btn-google')
    fireEvent.click(btnLogin)
    await waitFor(() => {
      expect(btnLogin).toBeInTheDocument()
      expect(mockLoginGoogle).toHaveBeenCalledWith(
        {
          idToken: token,
          rememberMe: true,
          deviceToken: ''
        },
        expect.any(Function)
      )
    })
  })

  test('navigate forgot password page', async () => {
    renderComponent()
    const forgotPassword = screen.getByText('Forgot_password')
    fireEvent.click(forgotPassword)
    await waitFor(() => {
      // expect(forgotPassword).toHaveBeenCalledWith(`${ROUTE_CONFIG.FORGOT_PASSWORD}`) // use for useRouter
      expect(forgotPassword.closest('a')).toHaveAttribute('href', ROUTE_CONFIG.FORGOT_PASSWORD) // use for Link
    })
  })
})
