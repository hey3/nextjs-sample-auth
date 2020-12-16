import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { IncomingHttpHeaders } from 'http'

import AuthService from '../services/auth'

type InnerGetServerSideProps<P extends { [key: string]: unknown }> = (
  context: GetServerSidePropsContext
) => Promise<{ props: P }>

export const withAuth = <P extends { [key: string]: unknown }>(
  inner?: InnerGetServerSideProps<P>
): GetServerSideProps => {
  return async ctx => {
    const {
      req: { headers },
      res,
    } = ctx
    const isAuthenticated = await validateTokenCookie(headers)
    if (!isAuthenticated) {
      res.setHeader('Location', '/login')
      res.statusCode = 307
    }

    return inner ? inner(ctx) : { props: {} }
  }
}

type BaseCookies = {
  [key: string]: string
}
type Cookies = BaseCookies & {
  _wsp?: string
}

export const validateTokenCookie = async (headers?: IncomingHttpHeaders): Promise<boolean> => {
  if (!headers || !headers.cookie) {
    return Promise.resolve(false)
  }
  const cookies: Cookies = headers.cookie.split(';').reduce((acc, cookie) => {
    const parts = cookie.match(/(.*?)=(.*)$/)
    if (parts === null)
      return {
        ...acc,
      }
    const [, key, value] = parts
    return {
      ...acc,
      [key.trim()]: value.trim(),
    }
  }, {})

  // Add logic here to verify token
  const token = cookies['_wsp']
  if (!token) {
    return Promise.resolve(false)
  }

  return AuthService.verify(token)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false))
}
