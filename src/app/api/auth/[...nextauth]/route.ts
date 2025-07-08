import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
      name: 'google',
      authorization: {
        params: {
          prompt: 'consent select_account',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET as string,
      name: 'facebook',
      authorization: {
        params: {
          response_type: 'code',
          response_mode: 'query',
          display: 'popup', // mở dưới dạng popup
          auth_type: 'reauthenticate', // ép chọn lại tài khoản & nhập lại mật khẩu
          scope: 'email,public_profile'
        }
      }
    })

    // ...add more providers here
  ],
  debug: true,
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account && account.provider) {
        token.provider = account.provider
      }
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.provider = token.provider

      return session
    }
  }
})

export { handler as GET, handler as POST }
