import NextAuth, { DefaultSession } from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db'
import { getUserById } from '@/data/user'
import { UserRole } from '@prisma/client'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { getAccountByUserId } from './data/account'

export type ExtendedUser = {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
} & DefaultSession['user']

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true

      if (!user.id) return false

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFactorConfirmation) return false

        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
})
